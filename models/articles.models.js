const db = require('../db/connection');

function fetchArticleById(article_id) {
  return db.query(
  `
    SELECT * FROM articles WHERE article_id = $1
  `,
  [article_id]
  )
  .then(res => {
    if (res.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'article not found'});
    }
    return res.rows[0];
  });
}

module.exports = { fetchArticleById };