/*jshint esversion: 8 */
const db = require('../models');
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const config = require('../../config');
const { respond } = require('../../lib');
const allRouters = [];
module.exports.create = () => {
    for (const Model in db) {
		const newRouter = require('express').Router();

		var modelArray = Model.split('');
		var newFirstLetter = modelArray.shift();
		newFirstLetter = newFirstLetter.toLowerCase();
		modelArray.unshift(newFirstLetter);
		const model = modelArray.reduce((acc, curr) => acc + curr);

		console.log(`Creating the ${model}s router using: create${Model}Router`);

		newRouter.use(`${model}s`, require(`./create${Model}Router`));
		allRouters.push(newRouter);
	}
    console.log(allRouters);
	return allRouters;
};
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