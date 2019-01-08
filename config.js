const dev = true;
const cfg = {};

cfg.secret = process.env.APP_SECRET;

cfg.mongoUri = dev ?
process.env.DEV_MONGO_URI: process.env.DEP_MONGO_URI;

cfg.serverPort = dev ? process.env.APP_DEV_SERVER_PORT : process.env.APP_DEP_SERVER_PORT;

cfg.clientPort = dev ? process.env.APP_DEV_CLIENT_PORT : process.env.APP_DEP_CLIENT_PORT;

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.authToken = process.env.TWILIO_AUTH_TOKEN;

cfg.twilioNumber = process.env.TWILIO_NUMBER;

module.exports = cfg;
