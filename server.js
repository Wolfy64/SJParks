/*
 * Express server that receives and replies to inbound SMS messages. 
 * When your Twilio number receives an incoming message, 
 * Twilio will send an HTTP request to a server you control. 
 * This callback mechanism is known as a webhook.  
 * When Twilio sends your application a request, 
 * it expects a response in the TwiML XML format 
 * telling it how to respond to the message.
 */

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
	  const twiml = new MessagingResponse();

	  twiml.message('The Robots are coming! Head for the hills!');

	  res.writeHead(200, {'Content-Type': 'text/xml'});
	  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => { 
	//1337 is a port for the temporary ngrok webhook running in the background
	  console.log('Express server listening on port 1337');
});
