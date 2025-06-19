const pool = require('../db');
const md5 = require('md5');

async function getUserAndPassword(usuario, password) {
  try {
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1';
    const [rows] = await pool.query(query, [usuario, md5(password)]);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getUserAndPassword };
