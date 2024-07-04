const moment = require('moment');
moment.locale('es');
console.log('naci ' + moment('04/10/1989', 'DD/MM/YYYY') .fromNow());