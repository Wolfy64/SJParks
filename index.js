const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');


// Initialize database connection - throws if database connection can't be
// established
mongoose.connect(config.mongoUrlTest);
mongoose.Promise = Promise;

console.log('PASS: index.js connected to mongoose')

// Create Express web app
const app = require('./webapp');

console.log('PASS: index.js required webapp.js')

// Create an HTTP server and listen on the configured port
const server = http.createServer(app);
server.listen(config.port, function() {
    console.log('Express server listening on *:' + config.port);
});
