const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { respond } = require('../lib');
const keys = require('../configurations/keys');

const home = (req, res) => {
  res.sendFile(path.join(`${__dirname}/../`, keys.path, 'index.html'));
};

const auth = async (req, res) => {
  const { token } = req.cookies;

  await jwt.verify(token, keys.secret, (err, payload) => {
    if (err) return respond(res, false, null, 'Invalid token');
    return respond(res, true, payload);
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ email });
  const isMatch = await user.validatePassword(password);

  if (user && isMatch) {
    res.cookie('token', user.generateJWT(), {
      httpOnly: true,
      maxAge: keys.expiration,
      secure: keys.prod ? true : false
    });

    return respond(res, true);
  }

  respond(res, false, null, 'User or Password do not match !');
};

module.exports = {
  auth,
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
