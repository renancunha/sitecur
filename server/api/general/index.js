'use strict';

var express = require('express');
var controller = require('./general.controller');

var router = express.Router();

router.get('/raspip', controller.getRaspIp);

module.exports = router;
