
const path = require('path');
const express = require('express');
const session = require('express-session');
const addRequestId = require('express-request-id')();
const cors = require('cors');
const logger = require('morgan');
const config = require('./config/');
const formData = require('express-form-data');
const db = require('./models');
const newLocal = config.keys.prod || config.keys.dev;
const app = express();

// ...logging
app.use(cors());
app.use(addRequestId);
logger.token('id', (req) => req.sessionID.split('-')[0]);
app.use(logger(inTesting ? 'dev' : 'combined', {
    skip: (req, res) => {
        return res.statusCode < 400;
    }
}));
app.use(logger(">[:date[iso] REQ]> Method = :method, Url = :url , SessionID = :id "));
app.use(logger(">[:date[iso] RES]> Status = :status, Type = :content-type "));

// ...view engine
if (inTesting) app.use(require('express-ejs-layouts'));
if (inTesting) app.set('views', path.join(__dirname, 'views'));
app.set('view engine', !inTesting ? 'pug' : 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(formData.parse());
app.use(express.static(path.join(__dirname, config.keys.path)));

// ...Session
const sessOpts = {
    secret: config.keys.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 1000,
        //activeDuration: 5 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}

if (!inTesting) {
    app.set('trust proxy', 1);
    sessOpts.cookie.secure = true;
}
app.use(session(sessOpts));

// ...passport
app.use(passport.initialize());
app.use(passport.session());
if (!inTesting) app.use(express.static(path.join(__dirname, config.keys.path)));


// ...error handler
if (inTesting) app.use(errorHandler);


// ...Flash
const flash = require('connect-flash');
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Configure Routes
app.use((req, res, next) => {
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});
// var index = require('./Routes/index');
var api = require('./Routes/api');
// app.use('/', index);
app.use('/api', api);
config.pass(passport);

//Error handlers & middlewares
if (inTesting) {

    app.use((req, res, next) => {
        res.status(404)
            .render(path.join(__dirname, config.keys.path, '404.ejs'));
    });

    app.use((err, req, res, next) => {
        res.status(500)
            .render(path.join(__dirname, config.keys.path, '500.ejs'));
    });

} else if (!inTesting) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
        next();
    });
}
console.log(`>  ...WebApp Created`);

module.exports = app;