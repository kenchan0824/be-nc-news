const {
  fetchArticleById,
  fetchArticles,
  checkArticleExists,
  updateArticleVotes,
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
  checkArticleExists(article_id)
    .then(() => {
      return createComment(article_id, comment);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
}

function patchArticle(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  if (!inc_votes) {
    return next({ status: 400, msg: "missing required information" });
  }
  checkArticleExists(article_id)
    .then(() => {
      return updateArticleVotes(article_id, inc_votes);
    })
    .then((article) => {
      res.status(202).send({ article });
    })
    .catch(next);
}

module.exports = {
  getArticleById,
  getArticles,
  getArticleComments,
  postArticleComment,
  patchArticle,
};
