function customErrorHandler(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).send({ msg: err.msg });
  } 
  next(err);
}

function psqlErrorHandler(err, req, res, next) {
  if (err.code) {
    if (err.code === "22P02") {
      return res.status(400).send({ msg: "bad data format" });
    }
    if (err.code === '23503') {
      return res.status(400).send({ msg: "invalid information provided" });
    }
    if (err.code === '23502') {
      return res.status(400).send({ msg: "missing required information" });
    }
  }
  next(err);
}

function unknownErrorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send({ msg: "please contact the administrator" });
}

module.exports = { customErrorHandler, psqlErrorHandler, unknownErrorHandler,}