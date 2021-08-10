var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verification = require('./verification');

router.post('/api/v1/register', auth.registration);
router.post('/api/v1/login', auth.login);

router.get('/api/v1/testing', verification(), auth.testing);

module.exports = router;