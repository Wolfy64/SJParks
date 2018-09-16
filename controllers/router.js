/*
 * This file is a template for router file. It is not finished, so you will see repos that do not exist.
 */

const pages = require('./pages');
const message = require('./message');
const test = require('./send_sms');


   // Map routes to controller functions
module.exports = function(app) {
     // Twilio SMS webhook route
   app.post('/message', message.webhook);
     //Render a userResident page about the project to find out more 
   app.get('/', pages.aboutPage);
    
     // Render a page that will allow an administrator to send out a message
     // to all subscribers
   app.get('/admin', pages.showForm);

    // Handle form submission and send messages to subscribers
   app.post('/message/send', test.sendMessages);
 };
