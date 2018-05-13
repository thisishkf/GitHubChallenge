'use strict';
const express = require('express');
const { _render, getmodel, makeAjax } = require('../Services/Helper');
const Logger = require('../Services/Logger');

var _router = express.Router();

_router.get('/', function (req, res) {
	logger.debug("Getting Index Page");	
	let model = getmodel();
	_render(res, 'index/index.ejs', model);
});

module.exports = _router;

