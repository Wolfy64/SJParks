const express = require('express');
const { auth } = require('../controllers');
const router = express.Router();

router.get('/auth', auth.auth);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.use(auth.home);

module.exports = router;
