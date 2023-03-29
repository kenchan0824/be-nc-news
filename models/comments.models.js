const db = require("../db/connection");

function fetchCommentsByArticle(article_id) {
  return db.query(
    `
      SELECT * 
      FROM comments c 
      WHERE article_id = $1
      ORDER BY created_at DESC;
    `,
      [article_id]
  )
    .then((res) => res.rows);
}

module.exports = { fetchCommentsByArticle };
