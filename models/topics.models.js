const db = require('../db/connection');

function fetchTopics() {
  return db.query(`
    SELECT * FROM topics;
  `)
    .then(res => res.rows);
}

function checkTopicExists(topic) {
  return db.query(`
      SELECT * from topics WHERE slug = $1;
    `, [topic]
  )
    .then(res => {
      if (res.rowCount === 0) 
        return Promise.reject({ status: 404, msg: 'topic not found'});
    });
}

module.exports = { fetchTopics, checkTopicExists };