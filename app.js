/*jshint esversion: 8 */
/** Load Dependencies */
require('dotenv-safe').load();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const path = require('path');
// const logger = require('morgan');
// const addRequestId = require('express-request-id')();
// const formData = require('express-form-data');

/** Load Configurations */
const config = require('./configurations');
const router = require('./routes').create();

let app = express();

/** View Engine */
app.use(cors());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, config.keys.path)));

/** Logger */
// app.use(addRequestId);
// logger.token('id', req => req.sessionID.split('-')[0]);
// app.use(logger('combined' /*, {skip: (req, res) => res.statusCode < 400 }*/));
// app.use(
//   logger(
//     '> [:date[iso]] :method :url :status :response-time ms - :res[content-length] >'
//   )
// );

/** Parser */
// app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded());

app.post('/login', router.auth);
app.get('/logout', router.auth);

/** Passport */
// config.passport(app);

/** Use Express middleware to handle cookies (JWT) */
app.use(cookieParser());

/** JWT Authentication */
app.use((req, res, next) => {
  const { token } = req.cookies;
  const auth = { isAuthenticated: false };

  if (token) {
    auth.isAuthenticated = true;
    auth.user = jwt.verify(token, config.keys.secret);
  }

  res.json(auth);
  next();
});

/** Routes */
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, x-token'
//   );
//   if (req.method === 'OPTIONS') {
//     res.end();
//   } else {
//     next();
//   }
// });

app.use('/api', router.api);
// app.post('/login', router.auth);

// router.all('/api/*', ensureAuthenticated);
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, config.keys.path)));

/** Error Handlers */
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     errors: {
//       message: err
//     }
//   });
// });

module.exports = app;
