const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel');

// Login POST (formulario desde el modal)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usuariosModel.getUserAndPassword(username, password);

    if (user) {
      req.session.user = { username };
      res.redirect('/admin/novedades');
    } else {
      res.redirect('/?loginError=1');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/?loginError=1');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;


