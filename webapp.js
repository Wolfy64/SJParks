const path = require('path');
const config = require('./config');

// Create Express web app
const express = require('express');
const app = express();

// Set webapp stock middleware functions/settings
app.set('view engine', 'pug');

const morgan = require('morgan');
app.use(morgan('combined'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

const flash = require('connect-flash');
app.use(flash());

const session = require('express-session');
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 1000,
        //activeDuration: 5 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

//
// Handle 404
app.use(function (req, res, next) {
    res.status(404);
    res.send(`
        <h3>Error 404</h3>
        <p>Not Found</p>
    `);
    next();
});

// Unhandled errors (500)
app.use(function (err, req, res, next) {
    console.error('An application error has occurred:');
    console.error(err);
    res.status(500);
    res.send(` <h3>Error 500</h3> <p>Internal Server Error</p> `);
    next();
});

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serve static assets
app.use(express.static(path.join(__dirname, "client", "build")));

// Configure Express webapp server_routes
var router = express.Router();
router.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    next();
})
require('./controllers/routes')(router);
app.use('/api', router);

module.exports = app;
