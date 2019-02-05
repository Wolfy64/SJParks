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
let app = express();

app.use(cors());

/** Logger */
app.use(addRequestId);
logger.token('id', (req) => req.sessionID.split('-')[0]);
app.use(logger('combined'/*, {skip: (req, res) => res.statusCode < 400 }*/));
app.use(logger('> [:date[iso]] :method :url :status :response-time ms - :res[content-length] >'));

/** Parser */
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

/** View Engine */
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, config.keys.path)));

/** Passport */
config.passport(app);

/** Routes */
app.use('/auth', router.auth);
app.use('/api', router.api);

/** Error Handlers */
app.use((err, req, res, next) => {
	res.status(500).json({
		errors: {
			message: err
		}
	});
});

module.exports = app;
