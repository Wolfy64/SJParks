/*jshint esversion: 8 */
require('dotenv-safe').config({
  allowEmptyValues: process.env.NODE_ENV !== 'production'
});

var payLoad = {};

payLoad.dev = process.env.NODE_ENV === 'development';
payLoad.prod = process.env.NODE_ENV === 'production';
payLoad.test = process.env.NODE_ENV === 'test';
payLoad.path = payLoad.prod ? 'client/build' : 'client/public';
payLoad.url = payLoad.prod ? process.env.MONGODB_URI : payLoad.dev ? process.env.MLAB_URI : process.env.TEST_MONGO_URL;
payLoad.secret = process.env.APP_SECRET || 'Sick as the rhymes, of that kid thats behind';
payLoad.port = payLoad.prod ? process.env.PORT : process.env.SERVER_PORT;
payLoad.accountSid = process.env.TWILIO_ACCOUNT_SID;
payLoad.authToken = process.env.TWILIO_AUTH_TOKEN;

module.exports = payLoad;
