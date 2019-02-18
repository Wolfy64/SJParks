/*jshint esversion: 8 */
const uuid = require('uuid/v4');
const passport = require('passport');
const addRequestId = require('express-request-id')();
const express = require('express');
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');
const morgan = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const db = require('../models/');
const config = require('./keys');
const { respond } = require('./lib');

module.exports = app => {
	/** 
	 * Configure Passport Strategies 
	 * 
	 * @description "The local strategy require a `verify` function which receives the credentials 
	 * (`username` and `password`) submitted by the user.  The function must verify 
	 * that the password is correct and then invoke `cb` with a user object, w
	 * hich will be set at `req.user` in route handlers after authentication."
	 * 
	 * @param {}
	 * @param {}
	 * @return {}
	 */
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'user[email]',
				passwordField: 'user[password]'
			},
			async (email, password, done) => {
				const errorMsg = { message: 'Invalid credentials' };
				const user = await db.User.findOne({ email}).catch(done);
				if (!user) return done(null, false, errorMsg);
				const isMatch = await user.validatePassword(password);
				const token = await user.generateJWT();

				return done(null, isMatch ? { token } : false, isMatch ? null : errorMsg);
			}
		)
	);


	/**
	 * Configure `Passport` authenticated session persistence.
	 * 
	 * @description 
	 * "In order to restore authentication state across HTTP requests, 
	 * `Passport` needs to `serialize` users into and `deserialize` users 
	 * out of the `session`.
	 * 
	 **/
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser(async (userId, done) => {
		const user = await db.User.findById(userId).catch(err => done(err));
		return done(null, user);
	});


	/** 
	 * Configure all application middleware's
	 * 
	 * @description 
	 * Use `application-level` middleware for common functionality, 
	 * including `logging`, `parsing`, and `session` handling. 
	 * 
	 * */
	
	const sessOpts = {
		genid: (req) => {
			return uuid() // use UUIDs for session IDs
		},
		store: new FileStore(),
		secret: config.secret,
		resave: false,
		saveUninitialized: true,
		rolling: true,
		name: 'sid',
		cookie: {
			httpOnly: true,
			maxAge: 20 * 60 * 1000,
			activeDuration: 5 * 60 * 1000,
			secure: false
		}
	};

	if (config.prod) {
		app.set('trust proxy', 1);
		sessOpts.cookie.secure = true;
	}
	app.use(addRequestId);
	morgan.token('id', req => req.sessionID.split('-')[0]);
	app.use(morgan('combined'));
	app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
	app.use(cookieParser());
	app.use(session(sessOpts));
	app.use(formData.parse());
	app.use(express.json());
	app.use(express.urlencoded({}));
	app.use(flash());

	/** Passport initialization */
	app.use(passport.initialize());
	app.use(passport.session());

	return app;
};