require('dotenv-safe').load();
const path = require('path');
const logger = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const addRequestId = require('express-request-id')();
const session = require('express-session');
const express = require('express');
const app = express();
const config = require('./config/');
console.log(`>[WEBAPP:012:030]> Creating WebApp...`);
//----------------------------------------------------------------------------------------------------------------------------------------------
//********************************************************* Configure App Middleware ***********************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------

// @desc Configuring View Engine
app.use(expressLayouts);

app.set('view engine', 'ejs');
// app.set('view engine', 'pug');


// @desc Configuring URL Parser
app.use(express.urlencoded({
    extended: false
}));

// @desc Configuring JSON Parser
app.use(express.json());

// @desc Configuring Express Session
app.use(session({
    secret: config.keys.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 1000,
        //activeDuration: 5 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

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
    skip: (req, res) => {
        return res.statusCode < 400
    }
}));
app.use(logger(">[:date[iso] req: Method = :method, Url = :url ]> "));
app.use(logger(">[:date[iso] res: Status = :status, ]> "));

//----------------------------------------------------------------------------------------------------------------------------------------------
//*********************************************************** Configure App Routes *************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------

// @desc Configuring Access to Project by Code from any Origin
app.use(function (req, res, next) {
    // console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

// // @desc Configuring Session Handling
// app.use((req, res, next) =>{
//   if (req.session.admin) next();
//   else res.redirect('api/user/login');
// });

// @desc Configuring Flash Messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// @desc Configuring View Index

// console.log('>[WEBAPP:089:027]>', path.join(__dirname, 'client', config.keys.clientPath));
// app.use(express.static(path.join(__dirname, 'client', config.keys.clientPath)));

app.use('/', require("./Routes"));

console.log(`>[WEBAPP:092:026]> ...WebApp Created`);
module.exports = app;
