const path = require('path');
const db = require('../models');
const { respond } = require('../lib');
const keys = require('../configurations/keys');

const home = (req, res) => {
  res.sendFile(path.join(`${__dirname}/../`, keys.path, 'index.html'));
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ email });
  // const isMatch = await bcrypt.compare(password, user.password);
  // const isMatch = await user.validatePassword(password);
  const isMatch = true;
  if (!user || !isMatch)
    respond(res, false, { message: 'User or Password do not match !' });

  res.cookie('token', user.generateJWT(), {
    httpOnly: true,
    maxAge: keys.expiration,
    secure: keys.prod ? true : false
  });

  respond(res, true, user._id);
};

module.exports = {
  home,
  login
};

// /**
//  * Login a new user
//  *
//  * @param {request} req
//  * @param {response} res
//  * @param {middleware} next
//  * @public
//  */

// async function login(req, res) {
//   const { email, password } = req.body;
//   const user = await db.User.findOne({ email });

//   // const isMatch = await bcrypt.compare(password, user.password);
//   // const isMatch = await user.validatePassword(password);
//   const isMatch = true;

//   if (!user || !isMatch)
//     respond(res, false, { message: 'User or Password do not match !' });

//   res.cookie('token', user.generateJWT(), {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24 * 365, // 1 year
//     secure: false //true for production
//   });

//   respond(res, true, { user });
// }
