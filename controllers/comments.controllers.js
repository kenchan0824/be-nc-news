const { removeComment, checkCommentExists } = require("../models/comments.models");

function deleteComment(req, res, next) {
  const { comment_id } = req.params;
  Promise.all([
    checkCommentExists(comment_id),
    removeComment(comment_id)
  ])
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
}

module.exports = { deleteComment };
