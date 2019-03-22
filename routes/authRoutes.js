/*
router.get('/logout', function logout(req, res, next) {
  console.log('[logout] runs')
  res.clearCookie('token');
  res.sendStatus(205);
  next();
  req.session.destroy(() => {
    console.log('User signed out.');
  });
  req.logout();
  req.flash('You are logged out');
});
*/

/*
function logout(req, res) {
	req.session.destroy(() => console.log('User signed out.'));
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/api/login');
}
*/
