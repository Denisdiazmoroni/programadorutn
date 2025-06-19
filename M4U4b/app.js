var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Importo rutas admin
var loginAdminRouter = require('./routes/admin/login');
var novedadesRouter = require('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'tu_clave_secreta_aqui',
  resave: false,
  saveUninitialized: false,
}));

// middleware para pasar user a las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// rutas públicas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// rutas admin
app.use('/admin/login', loginAdminRouter);
// La ruta base /admin carga novedadesRouter que maneja /novedades
app.use('/admin/novedades', novedadesRouter);

// manejo de 404
app.use(function(req, res, next) {
  next(createError(404));
});

// manejo de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
