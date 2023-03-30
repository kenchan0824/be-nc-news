const db = require('../db/connection');

function fetchUsers() {
  return db.query(`SELECT * FROM users;`)
    .then(res => res.rows);
}

module.exports = { fetchUsers };