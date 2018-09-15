/* 
 * This code creates a new instance of the Message resource 
 * and sends an HTTP POST to the Messages resource URI.
 */
const cfg = require('../config');
const accountSid = cfg.accountSid;
const authToken = cfg.authToken; 
const client = require('twilio')(accountSid, authToken);
//Import Parks object.
const phones = {
      PARK1: ['+14084552057', '+14084552057'],
      PARK2: ['+14084552057']}
const getSelected = (input, i = 0, result=[]) => {
    let parkList = [].concat(input);
    if(i===parkList.length) return result.filter((value, index, self)=>{ 
    return self.indexOf(value) === index;
});
  result = result.concat(phones[parkList[0]])
return getSelected (parkList, i+1, result) 
}

exports.sendMessages = function(request, response) {
  // Get message info from form submission
const message = request.body.message;
const parkID = request.body.parkID;
let selected = phones.parkID;
    
if(!message || !parkID) {
    response.send('Couldn\'t varify the request. <a href="/">Go Back</a>')
} else {
  /*client.messages
    .create({
	       body: request.body.message,
	       from: cfg.twilioNumber, //Twilio phone
	       to: selectedPhones //Phone list based on checklist
	     })
    .then(message => console.log(message.sid))
    .done();*/
  response.send(` Message was sent to ${parkID}: ${getSelected(parkID)} <a href="/">Go Back</a>`)
/*
  // Send messages to all users
  Subscriber.find({
    subscribed: true,
  }).then((users) => {
    messageSender.sendMessageToUsers(users, message, imageUrl);
  }).then(() => {
    request.flash('successes', 'Messages on their way!');
    response.redirect('/');
  }).catch((err) => {
    console.log('err ' + err.message);
    request.flash('errors', err.message);
    response.redirect('/');
  });*/
}
};