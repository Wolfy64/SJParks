// const jwt = require('express-jwt');

// const getTokenFromHeaders = (req) =>
// {
//   const { headers: { authorization } } = req;

//   if (authorization && authorization.split(' ')[0] === 'Token')
//   {
//     return authorization.split(' ')[1];
//   }
//   return null;
// };


/*const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',*/


// module.exports = {
//   ensureAuthenticated: function(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/api/user/login');
//   }
// };
