/** Load Dependencies */
require('dotenv-safe').load();
const path = require('path');
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const addRequestId = require('express-request-id')();
const formData = require('express-form-data');
/** Load Configurations */
const router = require('./Routes');
const config = require('./config');

let app = express();

/** View Engine */
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, config.keys.path)));

/** Logger */
app.use(addRequestId);
logger.token('id', req => req.sessionID.split('-')[0]);
app.use(logger('combined' /*, {skip: (req, res) => res.statusCode < 400 }*/));
app.use(
  logger(
    '> [:date[iso]] :method :url :status :response-time ms - :res[content-length] >'
  )
);

/** Parser */
app.use(formData.parse());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

/** Passport */
// config.passport(app);

/** Use Express middleware to handle cookies (JWT) */
app.use(cookieParser());

/** JWT Authentication */
app.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    console.log('TCL: token', token);
    const user = jwt.verify(token, config.keys.secret);
    res.json({ user });
  }

  next();
});

/** Routes */
app.use(function(req, res, next) {
  console.log('request', req.url, req.body, req.method);
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-token'
  );
  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
});

app.use('/api', router.api);

// router.all('/api/*', ensureAuthenticated);
app.post('/login', router.auth);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, config.keys.path, 'index.html'))
);

/** Error Handlers */
app.use((err, req, res, next) => {
  res.status(500).json({
    errors: {
      message: err
    }
  });
});

module.exports = app;
