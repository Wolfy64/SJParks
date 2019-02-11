const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const db = require('../models/');
const config = require('./keys');
// const ForceDotComStrategy = require('./lib/passport-forcedotcom').Strategy,
// const TwitterStrategy = require('passport-twitter').Strategy,
// const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (app) => {
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
			// activeDuration: 5 * 60 * 1000,
			secure: false
		}
	};

	if (config.prod || config.dev) {
		app.set('trust proxy', 1);
		sessOpts.cookie.secure = true;
	}

	app.use(session(sessOpts));

	/** Serialize user to user._id  */
	passport.serializeUser((user, done) => {
		return done(null, user._id);
	});

	/** Deserialize user from user._id */
	passport.deserializeUser(function(userId, done) {
		db.User
			.findById(userId)
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
		new LocalStrategy(
			{ usernameField: 'email' },
			async (email, password, done) => {
				// Match user
				let user = await db.User.findOne({ email })
				// Match password i
				let isMatch = await user.vali
				isMatch = true;
				console.log('passport.js:18 login is forced to', isMatch);

				if (!user || !isMatch) {
					return done(null, false, { message: 'Email or Password incorrect' });
				}

				// Set up JWT
				const token = jwt.sign({ user }, config.secret, {
					expiresIn: '1d'
				});
				console.log('token,', token);
				return done(null, { token });
			}
		)
	);
	
	/** Initialize Passport within the App*/
	app.use(passport.initialize());

	/** Add Passport to Express-Session instance */
	app.use(passport.session());

	return app;
};
