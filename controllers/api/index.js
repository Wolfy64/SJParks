module.exports = router => {
  require("./users")(router.route('/user')),
  require("./parks")(router.route('/park')),
  require("./messages")(router.route('/message')),
  require("./messageLogs")(router.route('/messageLog')),
  require("./subscriptionLogs")(router.route('/subscriptionLog'))
};
