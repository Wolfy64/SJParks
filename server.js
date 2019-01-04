console.log('>> TEST: Running server.js');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');

// Initialize database connection - throws if database connection can't be
// established
mongoose.connect(config.mongoUrl);
mongoose.Promise = Promise;

console.log('>> PASS: server.js connected to mongoose');

// Create Express web app
const app = require('./webapp');

// Create an HTTP server and listen on the configured port
const server = http.createServer(app);
server.listen(config.port, function() {
  console.log('>> Express server listening on port:' + config.port);
});
