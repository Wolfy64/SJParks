require('dotenv-safe').config({
  allowEmptyValues: true
});
require('dotenv-safe').load();

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';

module.exports = {
  dev: dev,
  prod: prod,
  test: test,
  clientPath: prod ? 'client/build' : dev ? 'client/public' : 'views',
  mongoUrl: prod ? process.env.Mongo_URI : dev ? process.env.MLAB_URI : process.env.TEST_MONGO_URI,
  port:  prod ? process.env.PORT : process.env.SERVER_PORT,
  secret: process.env.APP_SECRET,
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_NUMBER
};
