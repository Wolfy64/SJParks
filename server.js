console.log('Running server.js');
const mongoose = require('mongoose');
const config = require('./config');

const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

mongoose.connect(config.mongoUri, opts)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

//create webapp
const app = require('./webapp');

//create http server
const http = require('http');
const server = http.createServer(app);

//set http port
server.listen(config.serverPort, () => console.log(`...express server started on http://localhost:${config.serverPort}`));
