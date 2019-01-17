require('dotenv-safe').load();
const config = require('./config');
console.log(`>[SERVER:004:025]> Running index in ${process.env.NODE_ENV} mode...`);

//----------------------------------------------------------------------------------------------------------------------------------------------
//************************************************************** Connect MongoDB ***************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------
const mongoose = require('mongoose');
const db = config.keys.mongoUrl;

const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}

mongoose.Promise = global.Promise;

mongoose.connect(db, opts)
  .then(() => console.log(`>[SERVER:020:020]> MongoDB Connected @uri: ${db}...`))
  .catch(err => console.error(`>[SERVER:021:044]> An error occured while attempting to connect to MongoDB with @uri: ${db}. Error thrown: ${err.message}...`));

//----------------------------------------------------------------------------------------------------------------------------------------------
//*********************************************************** Deploy Express WebApp ************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------
const http = require('http');
const webapp = require('./App');
const server = http.createServer(webapp);;
server.listen(config.keys.port, () => console.log(`>[SERVER:032:054]> Express Server Deployed @url: http://localhost:${config.keys.port}...`));
