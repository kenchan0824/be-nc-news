const db = require('../db/connection');

function fetchTopics() {
  return db.query(`
    SELECT * FROM topics;
  `)
  .then(res => res.rows);
}

module.exports = { fetchTopics };