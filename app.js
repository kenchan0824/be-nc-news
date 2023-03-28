const express = require('express');
const { getArticleById } = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');

const app = express();

// app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.use('*', (req, res) => {
  res.status(404).send({ msg: 'Invalid path' });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(404).send({ msg: err.msg });
  } else if (err.code) {
    console.log(err);
    res.status(400).send({ msg: 'Invalid request'});
  } else {
    console.log(err);
    res.status(500).send({ msg: 'Please contact the administrator.'});
  }
});

module.exports = app;
