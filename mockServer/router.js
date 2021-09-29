const express = require('express');
const router = express.Router();

var dataController = require('./dataController');

router.get('/', dataController.getData);

module.exports = router;
