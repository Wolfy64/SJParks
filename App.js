require('dotenv-safe').load();
const path = require('path');
const logger = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const addRequestId = require('express-request-id')();
const session = require('express-session');
const express = require('express');
const app = express();
const config = require('./config/');
const formData = require('express-form-data');

console.log(`>[WEBAPP:012:030]> Creating WebApp...`);
//----------------------------------------------------------------------------------------------------------------------------------------------
//********************************************************* Configure App Middleware ***********************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------

// @desc Configures View Engine
if (config.keys.test)
{
    const expressEjsLayouts = require('express-ejs-layouts');
    app.use(expressEjsLayouts);
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'views')));
} else
{
    app.set('view engine', 'pug');
    app.use(express.static(path.join(__dirname, config.keys.clientPath)));
}

// @desc Configures URL Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(formData.parse());


// @desc Configures Express Session
const sess = {
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
if (app.get('env') === 'production'){
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// @desc Configuring Passport
config.pass(passport);
app.use(passport.initialize());
app.use(passport.session());

// @desc Configuring Express Flash
app.use(flash());

// @desc Configuring Morgan Logger
app.use(addRequestId);
logger.token('id', (req) => req.sessionID.split('-')[0]);
app.use(logger('combined', {
    skip: (req, res) =>
    {
        return res.statusCode < 400
    }
}));
app.use(logger(">[:date[iso] REQ]> Method = :method, Url = :url , SessionID = :id "));
app.use(logger(">[:date[iso] RES]> Status = :status, Type = :content-type "));

//----------------------------------------------------------------------------------------------------------------------------------------------
//*********************************************************** Configure App Routes *************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------

// @desc Configuring Access to Project by Code from any Origin
app.use((req, res, next) =>
{
    // console.log('request', req.url, req.body, req.method);
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

// @desc Configuring Flash Messages
app.use(function (req, res, next)
{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// @desc Configuring View Index

console.log('>[WEBAPP:089:027]>', path.join(__dirname, 'client', config.keys.clientPath));
app.use(express.static(path.join(__dirname, 'client', config.keys.clientPath)));
// // @desc Configuring Session Handling
// app.use((req, res, next) =>{
//   if (req.session.admin) next();
//   else res.redirect('api/login');
// });

app.use('/', require("./Routes"));

// Handle 404
app.use(function (request, response, next)
{
    response.status(404);
    response.sendFile(path.join(__dirname, 'views', '404.ejs'));
});

// Unhandled errors (500)
app.use(function (err, request, response, next)
{
    console.error('An application error has occurred:');
    console.error(err);
    console.error(err.stack);
    response.status(500);
    response.sendFile(path.join(__dirname, 'views', '500.ejs'));
});

console.log(`>[WEBAPP:092:026]> ...WebApp Created`);
module.exports = app;
