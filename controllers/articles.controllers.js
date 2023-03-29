const {
  fetchArticleById,
  fetchArticles,
  checkArticleExists,
} = require("../models/articles.models");
const {
  fetchCommentsByArticle,
  createComment,
} = require("../models/comments.models");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
}

function getArticles(req, res, next) {
  fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
}

function getArticleComments(req, res, next) {
  const { article_id } = req.params;
  Promise.all([
    fetchCommentsByArticle(article_id),
    checkArticleExists(article_id),
  ])
    .then(([comments, _]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
}

function postArticleComment(req, res, next) {
  const { article_id } = req.params;
  const comment = req.body;
  createComment(article_id, comment)
    .then((created) => {
      console.log(created);
      res.status(201).send({ created });
    })
    .catch(next);
}

module.exports = {
  getArticleById,
  getArticles,
  getArticleComments,
  postArticleComment,
};
