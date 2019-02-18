/*jshint esversion: 8 */
/** Load Configurations */
require('dotenv-safe').load();
const http = require('http');
const app = require('./app');
const config = require('./configurations');
const mongoose = require('mongoose',{ useMongoClient: true});
console.log(`> Running Server in ${process.env.NODE_ENV} mode...`);

/** Configure Mongoose Database */
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose
  .connect(config.keys.url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
} )
  .then(() => { console.log(`> MongoDB connected...`);})
  .catch(err => console.error(err));

/** Deploy Express Server*/
const server = http.createServer(app);
server.listen(config.keys.port, () => console.log(`> Express Server Deployed @url: http://localhost:${config.keys.port}...`));

