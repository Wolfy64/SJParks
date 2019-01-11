require('dotenv-safe').config({
  allowEmptyValues: true
});
require('dotenv-safe').load();
const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';
var path, url, url_test, secret, port, accountSid, authToken, twilioNumber;

path = prod ? 'build' : 'public';
url = dev || test ? process.env.MLAB_URI : process.env.MONGODB_URL;
url_test = dev || test ? process.env.TEST_MONGO_URL : 'mongodb://localhost/sj-parks';
secret = dev || prod ? process.env.APP_SECRET : 'keyboard cat';
port = prod ? process.env.PORT : process.env.SERVER_PORT;
accountSid = dev || prod ? process.env.TWILIO_ACCOUNT_SID : null;
authToken = dev || prod ? process.env.TWILIO_AUTH_TOKEN : null;
twilioNumber = dev || prod ? process.env.TWILIO_NUMBER : null;

module.exports = {
  clientPath: path,
  mongoUrl: url,
  mongoUrlTest: url_test,
  secret: secret,
  port: port,
  accountSid: accountSid,
  authToken: authToken,
  twilioNumber: twilioNumber
};
