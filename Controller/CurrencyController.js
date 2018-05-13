'use strict';
const express = require('express');
const { _render, getmodel, makeAjax } = require('../Services/Helper');
const currencyService = require('../Services/CurrencyService');
const currencyList = currencyService.getCurrencyList();

var _router = express.Router();

_router.get('/', function (req, res) {	
	let model = getmodel("");
	model.main.data=currencyList;
	_render(res, 'currency/index.ejs', model);
});

_router.get('/current', function (req, res) {	
	let model = getmodel("");
	model.main.data=currencyList;
	_render(res, 'currency/current.ejs', model);
});

_router.get('/historical', function (req, res) {	
	let model = getmodel("");
	model.main.data=currencyList;
	_render(res, 'currency/historical.ejs', model);
});

module.exports = _router;

