const {
  fetchArticleById,
  fetchArticles,
} = require("../models/articles.models");
const { fetchCommentsByArticle } = require("../models/comments.models");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
}

function getArticles(req, res, next) {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  }).catch(next);
}

function getArticleComments(req, res, next) {
  const { article_id } = req.params;
  fetchCommentsByArticle(article_id).then(comments => {
    res.status(200).send({ comments });
  }).catch(next);
}

module.exports = { getArticleById, getArticles, getArticleComments };
