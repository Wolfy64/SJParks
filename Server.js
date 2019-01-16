require('dotenv-safe').load();
const config = require('./config');
// process.env.NODE_ENV === "development";
console.log(`>[SERVER:004:025]> Running index in ${process.env.NODE_ENV} mode...`);
//----------------------------------------------------------------------------------------------------------------------------------------------
//************************************************************** Connect MongoDB ***************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------
const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}

const mongoose = require('mongoose');
const db = config.keys.mongoUrl;

mongoose.connect(db, opts)
  .then(() => console.log(`>[SERVER:020:020]> MongoDB Connected @uri: ${db}...`))
  .catch(err => console.error(`>[SERVER:021:044]> An error occured while attempting to connect to MongoDB with @uri: ${db}. Error thrown: ${err.message}...`));

mongoose.Promise = global.Promise;

//----------------------------------------------------------------------------------------------------------------------------------------------
//*********************************************************** Deploy Express Webapp ************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------
const http = require('http');
const webapp = require('./App');
const server = http.createServer(webapp);
const port = require('./config').keys.port;
server.listen(port, () => console.log(`>[SERVER:032:054]> Express Server Deploy