/** Load Dependencies */
require('dotenv-safe').load();
const path = require('path');
// const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const addRequestId = require('express-request-id')();
const formData = require('express-form-data');

/** Load Configurations */
const router = require('./Routes');
const config = require('./config');

let app = express();

/** View Engine */
// app.use(cors());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, config.keys.path)));

/** Logger */
app.use(addRequestId);
logger.token('id', req => req.sessionID.split('-')[0]);
app.use(logger('combined' /*, {skip: (req, res) => res.statusCode < 400 }*/));
app.use(logger('> [:date[iso]] :method :url :status :response-time ms - :res[content-length] >'));

/** Parser */
app.use(formData.parse());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

/** Passport */
config.passport(app);

/** Routes */
app.use(function(req, res, next) {
	console.log('request', req.url, req.body, req.method);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-token');
	if (req.method === 'OPTIONS') {
		res.end();
	} else {
		next();
	}
});

// router.all('/api/*', ensureAuthenticated);
app.post('/login', router.auth); //admin.admin.login

app.use('/api', router.api);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', config.keys.clientPath, 'index.html')));

/** Error Handlers */
app.use((err, req, res, next) => {
	res.status(500).json({
		errors: {
			message: err
		}
	});
});

module.exports = app;
