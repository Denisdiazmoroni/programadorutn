// Middleware para proteger rutas admin
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    // Redirigir al home con loginError=1 para abrir modal y mostrar mensaje
    res.redirect('/?loginError=1');
  }
}
const express = require('express');
const router = express.Router();
const novedadesModel = require('../../models/novedadesModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);


// 🔒 Protege todas las rutas de este router
router.use(checkAuth);

// GET: Mostrar listado de novedades
router.get('/', async (req, res) => {
  try {
    let novedades = await novedadesModel.getNovedades();

    novedades = novedades.map(novedad => {
      if (novedad.img_id) {
        const imagen = cloudinary.image(novedad.img_id, {
          width: 100,
          height: 100,
          crop: 'fill'
        });
        return { ...novedad, imagen };
      } else {
        return { ...novedad, imagen: '' };
      }
    });

    novedades.forEach((n, i) => n.orden = i + 1);

    const success = req.session.success;
    delete req.session.success;

    res.render('admin/novedades', {
      layout: false,
      novedades,
      success
    });
  } catch (error) {
    console.error('Error al obtener novedades:', error);
    res.render('admin/novedades', {
      layout: false,
      novedades: [],
      error: 'Error al cargar las novedades'
    });
  }
});

// GET: Eliminar novedad
router.get('/eliminar/:id', async (req, res) => {
  try {
    const novedad = await novedadesModel.getNovedadById(req.params.id);

    // Si tiene imagen, borrarla de Cloudinary
    if (novedad.img_id) {
      await cloudinary.uploader.destroy(novedad.img_id);
    }

    // Eliminar novedad de la base
    await novedadesModel.deleteNovedadById(req.params.id);

    req.session.success = 'Novedad eliminada correctamente.';
    res.redirect('/admin/novedades');
  } catch (error) {
    console.error('Error al eliminar novedad:', error);
    req.session.success = 'Error al eliminar la novedad.';
    res.redirect('/admin/novedades');
  }
});


// GET: Formulario agregar novedad
router.get('/agregar', (req, res) => {
  res.render('admin/agregar', {
    layout: false
  });
});

// POST: Agregar novedad
router.post('/agregar', async (req, res) => {
  try {
    let img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      const imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo && req.body.subtitulo && req.body.cuerpo) {
      await novedadesModel.insertNovedad({ ...req.body, img_id });
      req.session.success = 'Novedad agregada correctamente.';
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: false,
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.error(error);
    res.render('admin/agregar', {
      layout: false,
      error: true,
      message: 'No se cargó la novedad'
    });
  }
});


// GET: Formulario modificar novedad
router.get('/modificar/:id', async (req, res) => {
  const novedad = await novedadesModel.getNovedadById(req.params.id);

  let imagenUrl = '';
  if (novedad.img_id) {
    imagenUrl = cloudinary.url(novedad.img_id, {
      width: 400,
      crop: 'fill'
    });
  }

  res.render('admin/modificar', {
    layout: false,
    novedad,
    imagenUrl
  });
});
// POST: Modificar novedad
router.post('/modificar', async (req, res) => {
  try {
    const { id, titulo, subtitulo, cuerpo, eliminarImagen } = req.body;
    let obj = { titulo, subtitulo, cuerpo };

    // Obtener novedad actual para saber img_id
    const novedad = await novedadesModel.getNovedadById(id);

    // Si se quiere eliminar la imagen actual
    if (eliminarImagen === '1' && novedad.img_id) {
      await cloudinary.uploader.destroy(novedad.img_id);
      obj.img_id = null;  // borrar la referencia en la DB
    }

    // Si se sube una imagen nueva
    if (req.files && req.files.imagenNueva) {
      // Si existe imagen anterior, borrar
      if (novedad.img_id) {
        await cloudinary.uploader.destroy(novedad.img_id);
      }
      const imagen = req.files.imagenNueva;
      const result = await uploader(imagen.tempFilePath);
      obj.img_id = result.public_id;
    }

    if (titulo && subtitulo && cuerpo) {
      await novedadesModel.modificarNovedadById(obj, id);
      req.session.success = 'La novedad se modificó correctamente.';
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/modificar', {
        layout: false,
        error: true,
        message: 'Todos los campos son requeridos',
        novedad: { id, titulo, subtitulo, cuerpo }
      });
    }
  } catch (error) {
    console.error(error);
    res.render('admin/modificar', {
      layout: false,
      error: true,
      message: 'No se pudo modificar la novedad',
      novedad: req.body
    });
  }
});

module.exports = router;
