const express = require("express");
const cors = require('cors');
const endpoints = require('./endpoints.json');
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticleById,
  getArticles,
  getArticleComments,
  postArticleComment,
  patchArticle,
} = require("./controllers/articles.controllers");
const { deleteComment } = require("./controllers/comments.controllers");
const {
  customErrorHandler,
  psqlErrorHandler,
  unknownErrorHandler,
} = require("./controllers/errors.controllers");
const { getUsers } = require("./controllers/users.controllers");

const app = express();
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${new Date().toString()} ${req.method} ${req.originalUrl}`);
  }
  next();
});
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => res.status(200).send(endpoints));

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postArticleComment);
app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "invalid path" });
});
app.use(customErrorHandler);
app.use(psqlErrorHandler);
app.use(unknownErrorHandler);

module.exports = app;
