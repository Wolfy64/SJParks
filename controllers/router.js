const pages = require('./pages');
const message = require('./messageIncoming');
const login = require('./login');
const admin = require('./admin');

// Map routes to controller functions
module.exports = function(app) {
  //------------------------------------------------------------------------
  //****************************** ABOUT PAGE ******************************
  //------------------------------------------------------------------------

  // Render a userResident page about the project to find out more
  app.get('/', pages.aboutPage);

  //------------------------------------------------------------------------
  //****************************** LOGIN PAGE ******************************
  //------------------------------------------------------------------------

  // Render login page
  app.get('/login', pages.loginPage);

  // Handle sign in
  app.post('/login', login.validate);

  // Handle logout
  app.post('/login/out', login.logout);

  //------------------------------------------------------------------------
  //**************************** DASHBOARD PAGE ****************************
  //------------------------------------------------------------------------

  // Render the general public Dashboard/console
  app.get('/dashboard', login.requireUserLogin, pages.dashboardPage);

  //------------------------------------------------------------------------
  //****************************** ADMIN PAGE ******************************
  //------------------------------------------------------------------------

  // Render the Administrator Dashboard/console
  app.get('/admin', login.requireAdminLogin, pages.adminPage); //

  // Handle new user form submission
  app.post('/admin/newuser', admin.newUser);

  // Handle new park form submission
  app.post('/admin/newpark', admin.createPark);

  //DEVELOPER TOOL
  app.get('/admin/peek', admin.peek);

  //------------------------------------------------------------------------
  //*************************** MESSAGE HANDLING ***************************
  //------------------------------------------------------------------------

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
