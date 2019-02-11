require('dotenv-safe').config({
  allowEmptyValues: process.env.NODE_ENV !== 'production'
});
require('dotenv-safe').load();
let payLoad = {};

payLoad.dev = process.env.NODE_ENV === 'development';
payLoad.prod = process.env.NODE_ENV === 'production';
payLoad.test = process.env.NODE_ENV === 'test';
payLoad.path = payLoad.prod ? 'client/build/index.html' : payLoad.dev ? 'client/public/index.html' : 'views';
payLoad.url = payLoad.prod ? process.env.MONGODB_URI : payLoad.dev ? process.env.MLAB_URI : process.env.TEST_MONGO_URL;
payLoad.secret = process.env.APP_SECRET || 'Sick as the rhymes, of that kid thats behind';
payLoad.port = payLoad.prod ? process.env.PORT : process.env.SERVER_PORT;

module.exports = payLoad;
