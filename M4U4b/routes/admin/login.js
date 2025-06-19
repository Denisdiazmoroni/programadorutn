const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel'); // lo creamos en el siguiente paso

router.get('/', (req, res) => {
  res.render('admin/login', {
    layout: 'admin/layout',
    loginError: req.query.loginError
  });
});

router.post('/', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await usuariosModel.getUserAndPassword(usuario, password);

    if (user) {
      req.session.user = { username: usuario };
      res.redirect('/admin/novedades');
    } else {
      res.redirect('/admin/login?loginError=1');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/admin/login?loginError=1');
  }
});

module.exports = router;

