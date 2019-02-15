/*jshint esversion: 6 */
const path = require('path');
const db = require('../../models');
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const config = require('../../config');
const { respond } = require('../../lib/responseSender');


function loadReactRouter(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
}

// Session Handling
function requireAdminLogin(req, res, next) {
  if (req.session.admin) next();
  else res.redirect('/login');
}

function requireUserLogin(req, res, next) {
  if (req.session.username) next();
  else res.redirect('/login');
}


// Logout current user


module.exports = {
  login,
  loadReactRouter,
  ensureAuthenticated,
  requireUserLogin,
  requireAdminLogin,
  logout
};
