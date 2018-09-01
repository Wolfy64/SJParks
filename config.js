const cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 1337;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = 'ACd241712f0dddcf05da280dd2c87d79c4';
cfg.authToken = 'e588e3f2721f174ae344679510ad68ae';

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioNumber = '+18317774596';

// MongoDB connection string - MONGO_URL is for local dev,
// MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
cfg.mongoUrl = process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017'; // default

// MongoDB connection string for test purposes
cfg.mongoUrlTest = 'mongodb://localhost:8000';

// Export configuration object
module.exports = cfg;
