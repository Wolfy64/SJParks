require('dotenv-safe').load();
// require('dotenv-safe').config();
console.log(">> Running webapp.js. creating App...");
const path = require('path');
const express = require('express');
const app = express()

function newApp(){

// app.use(express.static(path.join(__dirname, "client", "build")));

app.use(express.static(path.join(__dirname, "client", "public")));

// console.log('>> PATH 2  ', path.join(__dirname, 'client', config.clientPath));
// app.use(express.static(path.join(__dirname, 'client', config.clientPath)));

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

app.use(function (err, req, res, next) {
    res.status(500).sendfile();
    next(new Error(`>> This app has failed. Error thrown: ${err}`));
});

app.set('view engine', 'pug');

const flash = require('connect-flash');
app.use(flash());

const morgan = require('morgan');
app.use(morgan('combined'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 1000,
        //activeDuration: 5 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

app.get('/',(req, res, next) =>res.send(path.join(__dirname, 'client/public/index')));


const router = require("./routes").newRouter();

app.use('/api', router);

return app;
}

module.exports = {
    newApp: newApp
}
