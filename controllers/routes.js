const message = require('./messageIncoming');
const login = require('./login');
const admin = require('./admin');

module.exports = router => {

  router.get("/", require("./apiController"));

  // Set router custom middleware functions
  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  router.route('/login').post(login.validate);

  router.route('/login/out').post(login.logout);

  router.route('/message/recieve').post(message.webhook);

 router.route('/message/send').post(admin.sendMessages);

require('./api/index')(router);

};
