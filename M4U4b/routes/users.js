var express = require('express');
var router = express.Router();
const pool = require('../db');
const md5 = require('md5');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [username, hashedPassword]
    );

    if (rows.length === 1) {
      // Guardar en sesión el usuario y el ID
      req.session.user = {
        id: rows[0].id,
        username: rows[0].usuario
      };

      // Mostrar en consola el login con fecha
      const fechaHora = new Date().toLocaleString();
      console.log(`[LOGIN] Usuario '${rows[0].usuario}' (ID: ${rows[0].id}) inició sesión el ${fechaHora}`);

      res.redirect('/admin/novedades');
    } else {
      res.redirect('/?loginError=1');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/?loginError=1');
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

