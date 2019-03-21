const express = require('express');
const { public } = require('../controllers');
const router = express.Router();

router.get('/auth', public.auth);
router.post('/login', public.login);
router.get('/logout', public.logout);
router.use(public.home);

module.exports = router;
