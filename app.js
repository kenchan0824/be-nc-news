const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.use('*', (req, res, next) => {
  next({ status: 404, msg: 'Invalid Path' });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(404).send({ msg: 'Resources not found'});
  } else if (err.code) {
    console.log(err);
    res.status(400).send({ msg: 'Invalid request'});
  } else {
    console.log(err);
    res.status(500).send({ msg: 'Please contact the administrator.'});
  }
});

module.exports = app;
