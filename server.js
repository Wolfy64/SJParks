console.log('Running server.js');
const config = require('./config');

// Set MongoDB connection options...
const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

// ...then connect to MongoDB using those options.
const mongoose = require('mongoose');
mongoose.connect(config.mongoUri, opts)
  .then(() => console.log(`MongoDB Connected @ uri: ${config.mongoUri} with connnection options: ${opts}`))
  .catch(err => console.log(`An error occured while attempting to connect to MongoDB with uri: ${config.mongoUri} and connection options: ${opts}. Error thrown: ${err.message}`));
mongoose.Promise = global.Promise;

// Finally, create http_server from webapp.js and...
const http = require('http');
const app = require('./webapp');
const server = http.createServer(app);
console.log(`An Express server has been created and is awaiting deployment.`)

// ...deploy http_server to localhost orHeroku
server.listen(config.serverPort, () => console.log(`Express server is deployed @: http://localhost:${config.serverPort}`));
