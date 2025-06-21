const express = require('express');
const router = express.Router();
const novedadesModel = require('../../models/novedadesModel');


// Middleware para proteger la ruta
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/?loginError=1');
  }
}

// Ruta protegida SIN layout
router.get('/', checkAuth, async (req, res) => {
  try {
    const novedades = await novedadesModel.getNovedades();

    const successMessage = req.session.success;
    req.session.success = null; // limpia el mensaje después de mostrarlo

    res.render('admin/novedades', {
      layout: false,
      novedades,
      successMessage
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
    console.log(req.body)

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
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
})

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