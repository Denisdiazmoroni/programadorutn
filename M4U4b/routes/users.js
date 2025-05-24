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
      req.session.user = { username };
      res.redirect('/');
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

