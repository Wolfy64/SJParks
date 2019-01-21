require('dotenv-safe').load();
const config = require('./config');
console.log(`> Running index in ${process.env.NODE_ENV} mode...`);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}

mongoose.connect(config.keys.url, opts)
  .then(() => console.log(`> MongoDB ...`))
  .catch(err => console.error(err));
mongoose.set('debug', true);

const http = require('http');
const webapp = require('./App');
const server = http.createServer(webapp);
server.listen(config.keys.port, () => console.log(`> Express Server Deployed @url: http://localhost:${config.keys.port}...`));
