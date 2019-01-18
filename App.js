console.log(`>      Creating WebApp...`);

const path = require('path');
const express = require('express');
const session = require('express-session');
const addRequestId = require('express-request-id')();
const cors = require('cors');
const errorHandler = require('errorhandler');
const logger = require('morgan');
const config = require('./config/');
const formData = require('express-form-data');
const db = require('./models');
const newLocal = config.keys.prod || config.keys.dev;
const app = express();

app.use(cors());
app.use(addRequestId);
logger.token('id', (req) => req.sessionID.split('-')[0]);
app.use(logger(newLocal ? 'dev' : 'combined', {
    skip: (req, res) =>
    {
        return res.statusCode < 400
    }
}));
app.use(logger(">[:date[iso] REQ]> Method = :method, Url = :url , SessionID = :id "));
app.use(logger(">[:date[iso] RES]> Status = :status, Type = :content-type "));

//
if (newLocal) app.use(require('express-ejs-layouts'));
app.set('view engine', newLocal ? 'pug' : 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(formData.parse());
app.use(express.static(path.join(__dirname, config.keys.path)));

// Configure Express Session
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
if (config.keys.prod)
{
    app.set('trust proxy', 1); // trust first proxy
    sessOpts.cookie.secure = true; // serve secure cookies
}
app.use(session(sessOpts));

app.use((req, res, next) =>
{
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if (req.method === 'OPTIONS')
    {
        res.end();
    } else
    {
        next();
    }
});

// if (!config.keys.prod) app.use(errorHandler);

// Configuring Express Flash
const flash = require('connect-flash');
// app.use(flash());
// app.use(function (req, res, next)
// {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });


// Configuring Passport
// const db = require('./models');
const passport = require('passport');
config.pass(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./Router'));
//Error handlers & middlewares
if (!config.keys.prod)
{
    app.use((err, req, res, next) =>
    {
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

app.use((req, res, next) =>
{
    res.status(404)
        .render(path.join(__dirname, 'views', '404.ejs'));
});

app.use((err, req, res, next) =>
{
    res.status(500)
        .render(path.join(__dirname, config.keys.path, '500.ejs'));
});

console.log(`>      ...WebApp Created`);

module.exports = app;
