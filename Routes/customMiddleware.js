/*
LOGIN PAGE FLOW....
1) User goes to /login.
2) User submits login data with form POST.
3) Server validates data and establishes login session.
4) Server does res.redirect('/home') (or whatever URL you want here) to tell the browser to go to the 5) new URL.
6) Browser processes the redirect and sends request for that new page.
7) Server sees request for the new page and uses res.render() to render the data for that page.
8) Browser displays rendered page on the new URL.
*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');


//




