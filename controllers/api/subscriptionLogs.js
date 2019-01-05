const db = require('../../models');

module.exports = subscriptionLogRoute => {

  // @route GET api/item
  // @desc Get all Items
  // @access Public
  subscriptionLogRoute
    .get('/', (req, res) => {
      db.Subscription.find()
        .sort({
          date: 1
        })
        .then(docs => res.status(200).json({
          success: true,
          subscriptions: docs
        }))
        .catch(err => res.status(404).json({
          success: false,
          error: err.errmsg
        }));
    });

}
