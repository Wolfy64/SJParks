/*
 * Connects extentions of the port to the functions that handle requests and responses.
 */

const pages = require('./pages');
const receive = require('./messageIncoming');
const send = require('./messageOutgoing');
const login = require('./login');
const admin = require('./admin');


// Map routes to controller functions
module.exports = function(app) {
  // Twilio SMS webhook route
  app.post('/message', receive.webhook);

    
    
  // Render a userResident page about the project to find out more 
  app.get('/', pages.aboutPage);
    
  // Render a page that will allow an administrator to send out a message
  // to all subscribers and redirect to login page if user is not logged in.
  app.get('/admin', login.requireLogin, pages.adminDashboard);

  // Render a login screen with which an administrator can log in
  app.get('/login', pages.loginForm);

    
    
  // Handle form submission and send messages to subscribers
  app.post('/message/send', send.sendMessages);

  // Handle new user form submission 
  app.post('/login/signup', login.newUser);

  // Handle new park form submission
  app.post('/admin/new_park', admin.createPark);


  
 };
