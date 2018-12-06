const pages = require('./pages');
const message = require('./messageIncoming');
const login = require('./login');
const admin = require('./admin');

// Map routes to controller functions
module.exports = function(app) {
  // Twilio SMS webhook route
  app.post('/message', message.webhook);
  //Render a userResident page about the project to find out more
  app.get('/', pages.aboutPage);

  // Render a page that will allow an administrator to send out a message
  // to all subscribers
  app.get('/admin', pages.showForm);
  //Render a login screen to with which an administrator can log in
  app.get('/login', pages.loginform);
  // Handle form submission and send messages to subscribers
  app.post('/message/send', send_sms.sendMessages);
  //Render reactDashboard
  app.get('/react-admin', pages.reactDashboard);
};
