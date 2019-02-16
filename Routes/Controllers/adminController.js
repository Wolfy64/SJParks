/*jshint esversion: 6 */
const path = require("path");
const db = require("../../models");
const jwt = require("jsonwebtoken");
// const passport = require('passport');
const config = require("../../config");
const { respond } = require("../../lib/responseSender");

async function login(req, res) {
  const { email, password } = req.body;
  const user = await db.User.findOne({ email });

  // const isMatch = await bcrypt.compare(password, user.password);
  // const isMatch = await user.validatePassword(password);
  const isMatch = true;

  if (!user || !isMatch)
    respond(res, false, { message: "User or Password do not match !" });

  res.cookie("token", user.generateJWT(), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    secure: false //true for production
  });

  respond(res, true, { user });
}

function loadReactRouter(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}

// Session Handling
function requireAdminLogin(req, res, next) {
  if (req.session.admin) next();
  else res.redirect("/login");
}

function requireUserLogin(req, res, next) {
  if (req.session.username) next();
  else res.redirect("/login");
}

// 	passport.authenticate('jwt', {
// 		session: false
// 	}),
// 	(req, res, next) => {
// 		res.json({
// 			user: req.user
// 		});
// 	}

function ensureAuthenticated(req, res) {
  const { token } = req.cookies;

  token
    ? respond(res, true, { user: jwt.verify(token, config.keys.secret) })
    : respond(res, false, { message: "Invalid token" });
}

// Logout current user
function logout(req, res, next) {
  res.clearCookie("token");
  respond(res, true);
}

module.exports = {
  login,
  loadReactRouter,
  ensureAuthenticated,
  requireUserLogin,
  requireAdminLogin,
  logout
};
