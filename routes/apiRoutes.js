const express = require('express');
const { parks, subscribe } = require('../controllers');
const router = express.Router();

//gets all parks from controller
router.get('/parks', parks.getAllParks);
//Signs Up new User and Park
router.post('/api/subscriptionLogs', subscribe.signUp);

module.exports = router;
