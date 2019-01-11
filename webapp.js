require('dotenv-safe').load();
const path = require('path');
const morgan = require('morgan');
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
if (process.env.NODE_ENV === 'development') {
    app.set('view engine', 'ejs');
} else {
    app.set('view engine', 'pug');
}

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
morgan.token('id', (req) => req.sessionID.split('-')[0]);
app.use(morgan('combined', {skip: (req, res) => {return res.statusCode < 400} }));
app.use(morgan("[: date[iso] #:id] Started :method :url for :remote-addr"));
app.use(morgan("[: date[iso] #:id] Completed: status: res[content - length] in: response - time ms "));

//----------------------------------------------------------------------------------------------------------------------------------------------
//*********************************************************** Configure App Routes *************************************************************
//----------------------------------------------------------------------------------------------------------------------------------------------

//  @desc Configuring Access to Project by  Code from any Origin
app.use(function (req, res, next) {
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

// @desc Configuring Flash Messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// @desc Configuring View Index
if (process.env.NODE_ENV === 'production') {
    console.log('>[WEBAPP:089:027]>', path.join(__dirname, 'client', config.keys.clientPath));
    app.use(express.static(path.join(__dirname, 'client', config.keys.clientPath)));
}

app.use('/', require("./routes"));

console.log(`>[WEBAPP:092:026]> ...WebApp Created`);
module.exports = app;
