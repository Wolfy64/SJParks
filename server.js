console.log('Running index.js')

const http = require('http');
const mongoose = require('mongoose');
console.log('Testing config')
const config = require('./config');
console.log('Passed config')


// Initialize database connection - throws if database connection can't be
// established
mongoose.connect(config.mongoUrlTest);
mongoose.Promise = Promise;

// Create Express web app
const app = require('./webapp');

// Create an HTTP server and listen on the configured port
const server = http.createServer(app);
server.listen(config.port, function() {
    console.log('Express server listening on *:' + config.port);
});
