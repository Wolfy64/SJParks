require('dotenv-safe').load();
// require('dotenv-safe').config();
console.log('>> Running Index');

// Set MongoDB connection options...
const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

// ...then connect to MongoDB using those options.
const mongoURI = !process.env.NODE_ENV ?
  process.env.DEV_MONGO_URI : process.env.DEP_MONGO_URI;
const mongoose = require('mongoose');
mongoose.connect(mongoURI, opts)
.then(() => console.log(`>> MongoDB Connected @uri: ${mongoURI}.`))
.catch(err => console.error(`>> An error occured while attempting to connect to MongoDB with uri: ${mongoURI}. Error thrown: ${err.message}`));

mongoose.Promise = Promise;
const http = require('http');
const webapp = require('./webapp').newApp();
const server = http.createServer(webapp);
console.log(`>> Express server created and awaiting deployment ...`);

// ...deploy http_server to localhost orHeroku
const PORT = !process.env.NODE_ENV ? process.env.APP_DEV_SERVER_PORT : process.env.APP_DEP_SERVER_PORT;
server/*app*/.listen(PORT, () => console.log(`>> Express server is deployed @: http://localhost:${PORT}`));
