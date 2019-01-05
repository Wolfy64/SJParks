const db = require('../../models');

module.exports = messageRoute => {

  // @route GET api/message
  // @desc Get all messages
  // @access Public
  messageRoute
    .get('/', (req, res) => {
      db.Message.find()
        .sort({
          date: -1
        })
        .then(docs => res.status(214).json({
          success: true,
          messages: docs
        }))
        .catch(err => res.status(414).json({
          success: false,
          error: err.errmsg
        }));
    });

}
