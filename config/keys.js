require('dotenv-safe').config({
  allowEmptyValues: true
});
require('dotenv-safe').load();
const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';
var path, url, secret, port, accountSid, authToken, twilioNumber;

path = prod ? 'build' : dev ? 'public' : 'test';
url = dev ? process.env.MLAB_URI : test ? process.env.TEST_MONGO_URL: process.env.MONGO_URI;
secret = dev || prod ? process.env.APP_SECRET : 'keyboard cat';
port = prod ? process.env.PORT : process.env.SERVER_PORT;
accountSid = dev || prod ? process.env.TWILIO_ACCOUNT_SID : null;
authToken = dev || prod ? process.env.TWILIO_AUTH_TOKEN : null;
twilioNumber = dev || prod ? process.env.TWILIO_NUMBER : null;

module.exports = {
  clientPath: path,
  mongoUrl: url,
  secret: secret,
  port: port,
  accountSid: accountSid,
  authToken: authToken,
  twilioNumber: twilioNumber
};
