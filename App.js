/** Load Dependencies */
require('dotenv-safe').load();
const path = require('path');
// const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const addRequestId = require('express-request-id')();

/** Load Configurations */
const router = require('./Routes');
const config = require('./config');
const inTesting = !(config.keys.prod || config.keys.dev);
let app = express();

// app.use(cors());

/** Logger */
app.use(addRequestId);
logger.token('id', (req) => req.sessionID.split('-')[0]);
app.use(
	logger(inTesting ? 'dev' : 'combined', {
		skip: (req, res) => {
			return res.statusCode < 400;
		}
	})
);
app.use(logger('> [:date[iso]] :method :url :status :response-time ms - :res[content-length] >'));

/** Parser */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(formData.parse());
app.use(express.static(path.join(__dirname, config.keys.path)));

/** View Engine */
if (inTesting) app.use(require('express-ejs-layouts'));
app.set('view engine', inTesting ? 'ejs' : 'pug');
if (inTesting)	app.set('views', path.join(__dirname, config.keys.path));
if (!inTesting) app.use(express.static(path.join(__dirname, config.keys.path)));

/** Passport */
config.passport(app);

/** Routes */
app.use('/auth', router.auth);
app.use('/api', router.api);

/** Error Handlers */
if (inTesting) {
	app.use((req, res, next) => {
		res.status(404).render('404.ejs');
	});

	app.use((err, req, res, next) => {
		res.status(500).render('500.ejs');
	});
} else if (!inTesting) {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err
			}
		});
	});
}

module.exports = app;
