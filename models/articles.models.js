const db = require("../db/connection");

function fetchArticleById(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((res) => {
      if (res.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return res.rows[0];
    });
}

function fetchArticles(topic, sort_by = 'created_at', order = 'desc') {
  let sql = `
    SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, 
    a.article_img_url, count(c.comment_id)::int AS comment_count 
    FROM articles a 
    LEFT JOIN comments c ON c.article_id = a.article_id `;
  const values = [];

  if (topic) {
    sql += `WHERE topic = $1 `;
    values.push(topic);
  }

  sql += `
    GROUP BY a.article_id
    ORDER BY a.${sort_by} ${order} ;
  `;

  return db.query(sql, values)
    .then((res) => res.rows);
}

function checkArticleExists(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((res) => {
      if (res.rowCount === 0)
        return Promise.reject({ status: 404, msg: "article not found" });
    });
}

function updateArticleVotes(article_id, inc_votes) {
  return db
    .query(
      `
        UPDATE articles 
        SET votes = votes + $1 
        WHERE article_id = $2
        RETURNING *;
      `,
      [article_id, inc_votes]
    )
    .then((res) => res.rows[0]);
}

module.exports = { fetchArticleById, fetchArticles, checkArticleExists, updateArticleVotes };
