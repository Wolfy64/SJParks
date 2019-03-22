/*jshint esversion: 8 */
require('dotenv-safe').config({ allowEmptyValues: true });
const express = require('express');
const config = require('./configurations');
const mongoose = require('mongoose', { useMongoClient: true });
const { env, port, url } = config.keys;
const cors = require('cors');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');
const addRequestId = require('express-request-id')();
const passport = require('passport');
/* FILES TO REQUIRE */
//Passport Auth
require('./services/passport');
const path = require('path');
let app = express();
const db = require('./models');
/* Routers */
const publicRouter = require('./routes/publicRoutes');
const apiRouter = require('./routes/apiRoutes');

morgan.token('id', req => req.sessionID.split('-')[0]);

/** Configure Mongoose Database */
mongoose.Promise = global.Promise;
mongoose.set('debug', false);
mongoose
  .connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .catch(err => console.error(`Database Connection Error: ${err}`));

//Parts to Use with Express Application
app.use(
  morgan(
    '[:date[iso]] :method :url :status :response-time ms - :res[content-length]'
  )
);
app.use(morgan('combined'));
app.use(cors());
app.use(flash());
app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, config.keys.path)));
app.use(addRequestId);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());
app.use(cookieParser());
/** Passport initialization */
app.use(passport.initialize());
app.use(passport.session());
//*  */ Routers
app.use('/api', apiRouter);
app.use('/', publicRouter);

/** Error Handlers */
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: `Something went wrong: ${err}`
  });
});

//Configuring CI if in Production Use*
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));
}
  //Serves Index File to Alll Paths that Have not been set*
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });

/* Handles Promise Rejection Errors  Important*/
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
/* Handles Closing DB Connection On Exit or CTRL-D  */
const handleExit = () => {
  mongoose.connection.close();
  console.log(' Server Shutting Down, Sockets Closed, DB Connection Closed');
  process.exit(0);
};

/* Shunts Down Connections Correctly on Exit Important
 exit process this may close kept alive sockets */
process.on('SIGINT', handleExit);
process.on('exit', handleExit);

/** Deploy Express Server*/
app.listen(port, () => {
  console.log(`Listening on port`, port);
});
