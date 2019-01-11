require('dotenv-safe').load();
const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';

module.exports = {
  clientPath:  prod ? 'build' : 'public',
  mongoUrl: dev || test ? process.env.MLAB_URI: process.env.MONGODB_URL,
  mongoUrlTest: dev || test ? process.env.TEST_MONGO_URL: 'mongodb://localhost/sj-parks',
  secret: dev || prod ? process.env.SECRET : 'keyboard cat',
  port: prod ? process.env.PORT: process.env.SERVER_PORT,
  accountSid: dev || prod ? process.env.TWILIO_ACCOUNT_SID : null,
  authToken: dev || prod ? process.env.TWILIO_AUTH_TOKEN : null,
  twilioNumber: dev || prod ? process.env.TWILIO_NUMBER : null
};
