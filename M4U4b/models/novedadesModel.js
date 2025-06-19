var pool = require('../db');

async function getNovedades() {
    var query = 'SELECT * FROM novedades';
    var [rows] = await pool.query(query);
return rows;
}

async function deleteNovedadById(id) {
    var query = "delete from novedades where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}

module.exports = { getNovedades, deleteNovedadById };
