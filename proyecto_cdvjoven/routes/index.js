var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  novedades = novedades.slice(0, 6);
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/img/noimage.jpg'
      }
    }
  });

  const loginError = req.query.loginError;
  res.render('index', {
    novedades,
    loginError
  });
});


router.get('/nosotros', function (req, res, next) {
  res.render('nosotros');
});

router.get('/plenitud', function (req, res, next) {
  res.render('plenitud');
});

router.get('/cdvradio', function (req, res, next) {
  res.render('cdvradio', { layout: false });
});

router.get('/enciendepodcast', function (req, res, next) {
  res.render('enciendepodcast', { layout: false });
});

router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;

  console.log(req.body);

  var obj = {
    to: 'denisdiazmoroni@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + " " + apellido + " se contactó a traves de la web y quiere mas info a este correo: " + email +
      ". <br> además, hizo el siguiente comentario: " + mensaje + ". <br> su tel es: " + telefono
  };

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'mensaje enviado correctamente',
  });
});

module.exports = router;
