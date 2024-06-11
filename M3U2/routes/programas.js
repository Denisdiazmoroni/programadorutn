var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hola soy la pagina de programas creada de un manejador');
});

module.exports = router;