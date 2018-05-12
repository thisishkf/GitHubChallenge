'use strict';
const express = require('express');
const { _render, getmodel, makeAjax } = require('../Services/Helper');
const currencyService = require('../Services/CurrencyService');
const currencyList = currencyService.getCurrencyList();

var _router = express.Router();

_router.get('/', function (req, res) {	
	let model = getmodel("", currencyList);
	_render(res, 'currency/index.ejs', model);
});

module.exports = _router;

