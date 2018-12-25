const pages = require('./pages');
const message = require('./messageIncoming');
const login = require('./login');
const admin = require('./admin');

module.exports = function (app) {

  app.get('/', pages.aboutPage);

  app.get('/login', pages.loginPage);

  app.post('/login', login.validate);

  app.post('/login/out', login.logout);

  app.get('/dashboard', login.requireUserLogin, pages.dashboardPage);

  app.get('/admin', login.requireAdminLogin, pages.adminPage);

  // User api
  app.post('/admin/newuser', admin.newUser);

  app.post('/admin/newpark', admin.createPark);

  app.get('/admin/peek', admin.peek);

  // app.use('/api/users', routes.users);

  // Message api
  app.post('/message', message.webhook);

  app.post('/admin/send_message', admin.sendMessages);

  // app.use('/api/messages', routes.messages);

};
