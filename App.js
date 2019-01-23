/** Load Dependencies */
require('dotenv-safe').load();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const addRequestId = require('express-request-id')();

/** Load Configurations */
const router = require('./Routes');
const config = require('./config'); 
const inTesting = !config.keys.prod || config.keys.dev;

/** Initialize An Express-App Instance*/
let app = express();
app.use(cors());

/** Logger */
app.use(addRequestId);
logger.token('id', (req) => req.sessionID.split('-')[0]);
app.use(logger(inTesting ? 'dev' : 'combined', {
    skip: (req, res) => {
        return res.statusCode < 400;
    }
}));
// app.use(logger("> [:date[iso] REQ] Method = :method, Url = :url , SessionID = :id >"));
// app.use(logger("> [:date[iso] RES] Status = :status"/*, Type = :content-type >*/));

/** Parser */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/** View Engine */
if (inTesting) app.use(require('express-ejs-layouts'));
app.set('view engine', inTesting ? 'ejs' : 'pug');
if (inTesting) {app.set('views', path.join(__dirname, 'views'));
} else if (!inTesting){app.use(express.static(config.keys.path));}

/** Passport */
config.passport(app);

/** Error-Handler */
// if (inTesting) app.use(require('errorhandler'));

/** Routes */
app.use('/', );
app.use('/api', router.api);

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
    });
}
console.log(`>  ...WebApp Created`);

module.exports = app;