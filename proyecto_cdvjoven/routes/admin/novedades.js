const express = require('express');
const router = express.Router();
const novedadesModel = require('../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

// Middleware para proteger la ruta
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/?loginError=1');
  }
}

router.get('/', checkAuth, async (req, res) => {
  try {
    let novedades = await novedadesModel.getNovedades();

  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...novedad,
      imagen
    }
    } else {
      return {
        ...novedad,
        imagen:''
      }
    }
  })

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



router.get('/eliminar/:id', checkAuth, async (req, res) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  req.session.success = 'Novedad eliminada correctamente.';
  res.redirect('/admin/novedades');
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: false
  })
})

//guardar el form de agregar
router.post('/agregar', async (req, res, next) => {
  try {
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    console.log(req.body)

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad({...req.body, img_id});
      req.session.success = 'Novedad agregada correctamente.';
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: false,
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: false,
      error: true,
      message: 'No se cargo la novedad'
    })
  }
});

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);
  console.log("variable novedad en ruta", novedad);
  res.render('admin/modificar', {
    layout: false,
    novedad: novedad
  });
});

//modif la novedad
router.post('/modificar', async (req, res) => {
  try {
    const { id, titulo, subtitulo, cuerpo } = req.body;

    if (titulo && subtitulo && cuerpo) {
      const obj = { titulo, subtitulo, cuerpo };
      console.log("Datos a modificar:", obj);
      await novedadesModel.modificarNovedadById(obj, id);
      req.session.success = 'La novedad se modificó correctamente';
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