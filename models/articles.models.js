const db = require("../db/connection");

function fetchArticleById(article_id) {
  return db
    .query(
      `
    SELECT * FROM articles WHERE article_id = $1
  `,
      [article_id]
    )
    .then((res) => {
      if (res.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return res.rows[0];
    });
}

function fetchArticles() {
  return db
    .query(`
      SELECT a.*, count(c.comment_id)::int AS comment_count
      FROM articles a
      LEFT JOIN comments c ON c.article_id = a.article_id
      GROUP BY a.article_id
      ORDER BY a.created_at DESC ;
    `)
    .then((res) => res.rows);
}

module.exports = { fetchArticleById, fetchArticles };
