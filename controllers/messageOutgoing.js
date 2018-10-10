/* Message Outgoing
 * This code creates a new instance of the Message resource 
 * and sends an HTTP POST to the Messages resource URI.
 */
const Park = require('../models/Park');
const MessageLog = require('../models/MessageLog');
const messageSender = require('../lib/messageSender');
const cfg = require('../config');
const accountSid = cfg.accountSid;
const authToken = cfg.authToken; 
const client = require('twilio')(accountSid, authToken);

const getSelected = (input, i = 0, result=[]) => {
    let parkList = [].concat(input);
    if(i===parkList.length) return result.filter((value, index, self)=>{ 
    return self.indexOf(value) === index;
});
    result = result.concat();
  // result = result.concat(phones[parkList[0]])
return getSelected (parkList, i+1, result) 
}

exports.sendMessages = function(request, response) {
  // Get message info from form submission
  const message = request.body.message;
  const parkID = request.body.parkID;
  
  console.log(request.session);
    
  if(!message) {
    respond('Reason: Empty message.', false);
  } else if(typeof(parkID) === 'string'){
    respond('Reason: No park selected', false);
  } else {
    // TODO prettify response with message displayed
    respond('Message: ' + message, true);
  


    // Send messages to all users subscribed to parks in Parks
    // Subscription.find({
    //   park: {$in: parkID},
    // }).then((users) => {
    //   messageSender.sendMessageToSubscribers(users, message, '');
    // }).then(() => {
    //   request.flash('successes', 'Messages on their way!');
    //   response.redirect('/admin');
    // }).catch((err) => {
    //   console.log('err ' + err.message);
    //   request.flash('errors', err.message);
    //   response.redirect('/admin');
    // });
  }

  // Send html response
  function respond(responseMessage, success) {
    response.send(`
        <html>
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Admin Dashboard - SJParks</title>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
              <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
              <style>
                  body{
                      font-family: Ubuntu, sans-serif;
                      margin: 30px 20px;
                  }
              </style>
          </head>
          <body>
              <p>${success ? 'Success: Message sent!' : 'Error: Couldn\'t verify the request'}.</p>
              <p>${responseMessage}</p>
              <a class="btn" href="/admin">< Back</a>
          </body>
        </html>`
    )
  }

};
