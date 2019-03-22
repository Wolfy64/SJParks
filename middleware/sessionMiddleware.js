// ###### SESSION MIDDLEWARE ######
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const uuid = require('uuid/v4');

/**
 * Configure all application middleware's
 *
 * @description
 * Use `application-level` middleware for common functionality,
 * including: `logging`, `parsing`, and `session` handling.
 *
 * */

// const sessOpts = {
//   genid: req => {
//     return uuid(); // use UUIDs for session IDs
//   },
//   store: new FileStore(),
//   secret: config.keys.secret,
//   resave: false,
//   saveUninitialized: true,
//   rolling: true,
//   name: 'sid',
//   cookie: {
//     httpOnly: true,
//     maxAge: 20 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
//     secure: false
//   }
// };

// if (config.keys.prod) {
//   app.set('trust proxy', 1);
//   sessOpts.cookie.secure = true;
// }

// app.use(session(sessOpts));
