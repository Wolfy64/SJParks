/** Load Dependencies */
const http = require('http');

/** Load Configurations */
require('dotenv-safe').load();
const webapp = require('./App');
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

/** Connect Mongoose to MongoDB */
mongoose.connect(config.keys.url, opts)
  .then(() => console.log(`> MongoDB connected...`))
  .catch(err => console.error(err));

/** Create Express-App Server */
const server = http.createServer(webapp);

/** Deploy Express-App to Local-Host*/
server.listen(config.keys.port, () => console.log(`> Express Server Deployed @url: http://localhost:${config.keys.port}...`));
 