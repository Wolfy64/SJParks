/*jshint esversion: 8 */
/** Load Configurations */
require('dotenv-safe').config({ allowEmptyValues: true });
const express = require('express');
const app = require('./app');
const server = express(app);
const config = require('./configurations');
const mongoose = require('mongoose', { useMongoClient: true });
const { env, port, url } = config.keys;

/** Configure Mongoose Database */
mongoose.Promise = global.Promise;
mongoose.set('debug', false);
mongoose
  .connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .catch(err => console.error(err));

/** Deploy Express Server*/
server.use(app);
server.listen(port, () =>
  console.log(`> Server in ${env}: http://localhost:${port}`)
);
