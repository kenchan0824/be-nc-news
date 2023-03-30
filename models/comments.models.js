const db = require("../db/connection");

function fetchCommentsByArticle(article_id) {
  return db
    .query(
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
  return db
    .query(
      `
      INSERT INTO COMMENTS (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *;  
    `,
      [article_id, comment.username, comment.body]
    )
    .then((res) => res.rows[0]);
}

function removeComment(comment_id) {
  return db.query(
    `
      DELETE FROM comments 
      WHERE comment_id = $1;
    `,
    [comment_id]
  );
}

function checkCommentExists(comment_id) {
  return db
    .query(
      `
      SELECT * 
      FROM comments 
      WHERE comment_id = $1
    `,
      [comment_id]
    )
    .then((res) => {
      if (res.rowCount === 0)
        return Promise.reject({ status: 404, msg: "comment not found" });
    });
}

module.exports = { fetchCommentsByArticle, createComment, removeComment, checkCommentExists };
