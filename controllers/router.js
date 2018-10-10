/*
 * This file is a template for router file. It is not finished, so you will see repos that do not exist.
 */

const pages = require('./pages');
const message = require('./messageIncoming');
const send_sms = require('./messageOutgoing');
const login = require('./login');
const admin = require('./admin');


// Map routes to controller functions
module.exports = function(app) {;

  // Render a login screen with which an administrator can log in
  app.get('/login', pages.loginform);

  // Render a userResident page about the project to find out more 
  app.get('/', pages.aboutPage);
    
  // Render a page that will allow an administrator to send out a message
  // to all subscribers
  app.get('/admin', login.requireLogin, pages.showForm);//

  // Handle new user form submission 
  app.post('/login/signup', login.newUser)

  // Twilio SMS webhook route
  app.post('/message', message.webhook);

  // Handle form submission and send messages to subscribers
  app.post('/message/send', send_sms.sendMessages);

  // Handle new park form submission
  app.post('/admin/new_park', admin.createPark);


  
 };
