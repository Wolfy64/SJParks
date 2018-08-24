/* 
 * This code creates a new instance of the Message resource 
 * and sends an HTTP POST to the Messages resource URI.
 */

const accountSid = 'ACd241712f0dddcf05da280dd2c87d79c4'; //realSid
const authToken = 'e588e3f2721f174ae344679510ad68ae'; //realToken
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
	       body: 'Hi there! This is a test messege from Twilio.',
	       from: '+18317774596', //Twilio phone
	       to: '+14084552057' //Irina's phone
	     })
  .then(message => console.log(message.sid))
  .done();
