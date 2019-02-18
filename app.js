/*jshint esversion: 8 */
const path = require('path');
const uuid = require('uuid/v4');
const passport = require('passport');
const express = require('express');
const addRequestId = require('express-request-id')();
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');
const morgan = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const cors = require('cors');

/** Load Configurations */
require('dotenv-safe').load();
morgan.token('id', req => req.sessionID.split('-')[0]);
const respond = require('./lib').respond;
const config = require('./configurations');
const db = require('./models');
const router = require('./routes');
let app = express();

/** 
	 * Configure Passport Strategies 
	 * 
	 * @description "The local strategy require a `verify` function 
	 * which receives the credentials (`username` and `password`) 
	 * submitted by the user.  The function must verify that the 
	 * password is correct and then invoke `cb` with a user object, which 
	 * will be set at `req.user` in route handlers after authentication."
	 *
	 */
passport.use(
	new LocalStrategy(
		{
			usernameField: 'user[email]',
			passwordField: 'user[password]'
		},
		async (email, password, done) => {
			const errorMsg = { message: 'Invalid credentials' };
			const user = await db.User.findOne({ email }).catch(done);
			if (!user) return done(null, false, errorMsg);
			const isMatch = await user.validatePassword(password);
			const token = await user.generateJWT();
			console.log('[passport] Local strategy configured');
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
	console.log(`[passport] A user with userId:${user._id} has been deserialized`);
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
	genid: req => {
		return uuid(); // use UUIDs for session IDs
	},
	store: new FileStore(),
	secret: config.keys.secret,
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
app.use(cors());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, config.keys.path)));
app.use(addRequestId);
app.use(cookieParser());
app.use(session(sessOpts));
app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(morgan('combined'));
app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));

/** Passport initialization */
app.use(passport.initialize());
app.use(passport.session());

/*

module.exports.login = router.post('/login', async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await db.User.findOne({ email });
  // const isMatch = await bcrypt.compare(password, user.password);
  // const isMatch = await user.validatePassword(password);
  const isMatch = true;
  if (!user || !isMatch)
    res.json({ message: 'User or Password do not match !' });

  // Set JWT into the cookie
  res.cookie('token', user.generateJWT());
  res.json({ user });
});

router.get('/logout', function logout(req, res, next) {
  console.log('[logout] runs')
  res.clearCookie('token');
  res.sendStatus(205);
  // next();
  // req.session.destroy(() => {
  //   console.log('User signed out.');
  // });
  // req.logout();
  // req.flash('success_msg', 'You are logged out');
});


// 	passport.authenticate('jwt', {
// 		session: false
// 	}),
// 	(req, res, next) => {
// 		res.json({
// 			user: req.user
// 		});
// 	}

// function ensureAuthenticated(req, res) {
//   const auth = { isAuthenticated: false };
//   const { token } = req.cookies;

//   if (token) {
//     auth.isAuthenticated = true;
//     auth.user = jwt.verify(token, config.keys.secret);
//   }

//   res.json({auth})
// }
*/

/** Use Express middleware to handle cookies (JWT) */
// app.use(cookieParser());

/*
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-token');
	if (req.method === 'OPTIONS') {
		res.end();
	} else {
		next();
	}
});
*/
/*
 
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
  */
// app.get(
// 	'/api/users',
// 	/*router*/ async (req, res) => {
// 		try {
//       const users = await db.User
//         .find({})
//         .sort({
//           userName: 1
//         })
//         .catch(err => respond(res, false, err));
//       respond(res, true, users);
//       // res.send(users);
//     } catch (errors) {
//       console.log(errors);
//     }
// 	}
// );

// router.all('/api/*', ensureAuthenticated);
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, config.keys.path)));

/** JWT Authentication */
app.use((req, res, next) => {
  const { token } = req.cookies;

  if (!token) res.json({ user: null });

  if (token) {
    const user = jwt.verify(token, config.keys.secret);
    res.json(user);
  }

  next();
});

/** Routes */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-token'
    );
    if (req.method === 'OPTIONS') {
      res.end();
    } else {
      next();
    }
  });

// router.all('/api/*', ensureAuthenticated);

app.use('/api', router);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, config.keys.path, 'index.html'));
// });

/** Error Handlers */
app.use((err, req, res, next) => {
  res.status(500).json({
    errors: {
      message: err
    }
  });
});

module.exports = app;

/*
			(err, passportUser, info) => {
				console.log('[loginRouter],', err.message, passportUser, info);
				if (err) return next(err);

				if (passportUser) {
					const user = passportUser;
					user.token = passportUser.generateJWT();
					return respond(res, true, { user: user.toAuthJSON() });
				}

				if (info) return respond(res, false, info);
			}
		)(req, res, next);

		console.log('[loginController] payload,', payload);

		return payload;
	}
}*/

/*
async function login (req, res, next) {    
	//res.cookie('dummyCookie', 'hi')
	console.log('[login] respond', respond)
	const isValid = true;
	if (isValid) {
		console.log('[login] req', req.body);		
		let user = await db.User.findOne({email: req.body.email});
		console.log('[login] user', user.email);
		// Match password i
		// let isMatch = await user.validatePassword(password);
		isMatch = true;
		const token = user.generateJWT();
		console.log('[login] token', token.slice(0, 5));
		respond.respond(res.cookie('token', token), true, { token });
        // const payload = passport.authenticate(
        //     'local', 
        //     (err, passport, info) => {
        //         console.log('[login.passport.authenticate]', err, passport.user, info);
		// 		if (err) return next(err);

		// 		if (passport) {
		// 			const user = passport.user;
		// 			user.generateJWT();
		// 			return respond(res, true, { user: user.toAuthJSON() });
		// 		}

		// 		if (info) return respond(res, false, info);

		// 		return respond(res, false)
		// 	}
        // )(req, res, next);

        // console.log('[login] payload,', payload)
        
        // return payload;
	}
}
*/

/**
 * Login a new user
 *
 * @param {request} req
 * @param {response} res
 * @param {middleware} next
 * @public
 */

/* async function login( req,	res, next) {
  const { errors, isValid, data } = validateLoginInput(req.body);
if (!isValid) {
console.log(errors);
respond(res, false, errors);
} else {
console.log('[login] body.email', req.body.email);
let user = await db.User.findOne({ email: req.body.email });
console.log('[login] user', user.email);
// const isMatch = await bcrypt.compare(password, user.password);
const isMatch = await user.validatePassword(password);
// const isMatch = true;
console.log('[login] isMatch', isMatch);

if (!user || !isMatch) res.json({ message: 'User or Password do not match !' });

// Set JWT into the cookie
const token = await user.generateJWT();
respond(res.cookie('token', token), true, { token });
}
}

// Logout current user
function logout(req, res) {
req.session.destroy(() => console.log('User signed out.'));
req.logout();
req.flash('success_msg', 'You are logged out');
res.redirect('/api/login');
}

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
return next(null);
}
res.redirect('/error');
}
*/