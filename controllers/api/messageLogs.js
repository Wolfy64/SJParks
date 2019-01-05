const db = require('../../models');

module.exports = messageLogRoute => {

  // @route GET api/messageLog/
  // @desc Get all messageLog's
  // @access Public
  messageLogRoute
  .get('/', (req, res) => {
    db.MessageLog
    .find()
      .sort({
        date: -1
      })
      .then(docs => res.status(200).json({
        success: true,
        messageLogs: docs
      }))
      .catch(err => res.status(404).json({
        success: false,
        error: err.errmsg
      }));
  });

}
