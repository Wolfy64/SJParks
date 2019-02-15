module.exports.users = require("./userController");
module.exports.parks = require("./parkController");
module.exports.updates = require("./updateController");
module.exports.messageLogs = require("./messageLogController");
module.exports.subscriptionLogs = require("./subscriptionLogController");


router.post('/login', controllers.admin.login);

router.get('/logout', controllers.admin.logout);