const express = require('express');
const { public } = require('../controllers');
const router = express.Router();

router.post('/login', public.login);
router.use(public.home);

module.exports = router;
