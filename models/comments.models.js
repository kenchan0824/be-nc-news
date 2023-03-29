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

function createComment(article_id, comment) {
  return db.query(
    `
      INSERT INTO COMMENTS (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *;  
    `,
    [article_id, comment.username, comment.body]
  ).then(res => res.rows[0]);
}

module.exports = { fetchCommentsByArticle, createComment };
