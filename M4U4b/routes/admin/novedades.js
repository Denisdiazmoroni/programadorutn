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
    res.render('admin/novedades', {
      layout: false,
      novedades  
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
    res.redirect('/admin/novedades')
})

module.exports = router;