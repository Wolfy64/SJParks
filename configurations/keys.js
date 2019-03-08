/*jshint esversion: 8 */

var payLoad = {};
payLoad.cloudinaryOptions = {};

payLoad.dev = process.env.NODE_ENV === 'development';
payLoad.prod = process.env.NODE_ENV === 'production';
payLoad.local = process.env.NODE_ENV === 'local';
payLoad.path = payLoad.prod ? 'client/build' : 'client/public';
payLoad.url = payLoad.prod
  ? process.env.MONGODB_URI
  : payLoad.dev
  ? process.env.MLAB_URI
  : process.env.TEST_MONGO_URL;
payLoad.secret =
  process.env.APP_SECRET || 'Sick as the rhymes, of that kid thats behind';
payLoad.port = payLoad.prod ? process.env.PORT : process.env.SERVER_PORT;
payLoad.accountSid = process.env.TWILIO_ACCOUNT_SID;
payLoad.authToken = process.env.TWILIO_AUTH_TOKEN;
payLoad.cloudinaryOptions.cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
payLoad.cloudinaryOptions.api_key = process.env.CLOUDINARY_API_KEY;
payLoad.cloudinaryOptions.api_secret = process.env.CLOUDINARY_API_SECRET;

module.exports = payLoad;
