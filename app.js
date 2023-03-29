const express = require("express");
const {
  getArticleById,
  getArticles,
  getArticleComments,
  postArticleComment,
} = require("./controllers/articles.controllers");
const {
  customErrorHandler,
  dataErrorHandler,
  unknownErrorHandler,
} = require("./controllers/errors.controllers");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postArticleComment);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "invalid path" });
});
app.use(customErrorHandler);
app.use(dataErrorHandler);
app.use(unknownErrorHandler);

module.exports = app;
