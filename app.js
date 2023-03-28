const express = require('express');
const { getArticleById, getArticles, getArticleComments } = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');

const app = express();

// app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getArticleComments);

app.use('*', (req, res) => {
  res.status(404).send({ msg: 'Invalid path' });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code) {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'bad input parameter(s)'});
    }
  } else {
    console.log(err);
    res.status(500).send({ msg: 'Please contact the administrator.'});
  }
});

module.exports = app;
