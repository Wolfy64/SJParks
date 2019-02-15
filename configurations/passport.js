/*jshint esversion: 8 */
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const db = require('../models/');
const config = require('./');
const { respond } = require('../lib');

module.exports = app => {
	/** Configure Express-Session */
	const sessOpts = {
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

	app.use(session(sessOpts));

	/** Flash */
	// app.use(flash());
	// app.use(function(req, res, next) {
	// 	res.locals.success_msg = req.flash('success_msg');
	// 	res.locals.error_msg = req.flash('error_msg');
	// 	res.locals.error = req.flash('error');
	// 	next();
	// });

	/** Serialize user to user._id  */
	passport.serializeUser((user, done) => {
		return done(null, user._id);
	});

	/** Deserialize user from user._id */
	passport.deserializeUser(function(userId, done) {
		db.User.findById(userId)
			.then(function(user) {
				done(null, user);
			})
			.catch(function(err) {
				done(err);
			});
	});

	/** Configure Passport Strategies */
	// Local Strategy
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
			console.log('[passport] localStrategy', email, password);
			// Match user
			let user = await db.User.findOne({ email });
			// Match password i
			// let isMatch = await user.validatePassword(password);
			isMatch = true;
			console.log('[passport] login is forced to', isMatch);

			if (!user || !isMatch) {
				return done(null, false, { message: 'Email or Password incorrect' });
			}

			// Set up JWT
			const token = 
				jwt.sign(
					{ 
						userName: user.userName, 
						userId: user._id,
						access: user.access,  
					}, 
				config.keys.secret, { 
				expiresIn: '1d'
			});
			console.log('[passport] done, token', token);
			return done(null, { token });
		})
		/**new LocalStrategy(
			{
				usernameField: 'user[userName]',
				passwordField: 'user[password]'
			},
			(username, password, done) => {
				const errorMsg = { message: 'Invalid username or password' };

				// Match user
				db.User
					.findOne({
						userName: username
					})
					.then((matchedUser) => {
						if (!matchedUser) {
							return done(null, false, errorMsg);
						}
						return matchedUser
							.validatePassword(password)
							.then((isMatch) => done(null, isMatch ? matchedUser : false, isMatch ? null : errorMsg));
					})
					.catch(done);
			}
		) */
	);

	/** Initialize Passport within the App*/
	app.use(passport.initialize());

	/** Add Passport to Express-Session instance */
	app.use(passport.session());

	return app;
};
