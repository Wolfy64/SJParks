/** Load Configurations */
require('dotenv-safe').load();
const config = require('./config');
console.log(`> Running Server in ${process.env.NODE_ENV} mode...`);

/** Configure Mongoose */
const mongoose = require('mongoose',{
  useMongoClient: true
});
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

/** Connnect Mongoose to MongoDB */
mongoose.connect(config.keys.url, opts)
  .then(() => {
    require('./Routes/seedDB').dbSeedEngine([/*UserList*/],[/* ParkList*/], [/*MessageList*/], [/*MessageLog0*/], [/*SubscriptionLog */]);
    console.log(`> MongoDB connected...`);
  })
  .catch(err => console.error(err));

/** Create Express-App Server */
const http = require('http');
const webapp = require('./App');
const server = http.createServer(webapp);

/** Deploy Express-App to Local-Host*/
server.listen(config.keys.port, () => console.log(`> Express Server Deployed @url: http://localhost:${config.keys.port}...`));
