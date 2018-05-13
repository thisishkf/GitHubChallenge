'use strict';
const express = require('express');
const { _render, getmodel, makeAjax } = require('../Services/Helper');
const currencyService = require('../Services/CurrencyService');
const currencyList = currencyService.getCurrencyList();
const Logger = require('../Services/Logger');
var _router = express.Router();

_router.get('/', function (req, res) {
	let model = getmodel("");
	model.main.data = currencyList;
	_render(res, 'currency/index.ejs', model);
});

_router.get('/current', function (req, res) {
	let model = getmodel("", ['currency/current.js']);
	model.main.data = currencyList;
	_render(res, 'currency/current.ejs', model);
});

_router.get('/ajax/current/:from/:to', function (req, res) {
	const from = req.params.from;
	const to = req.params.to;
	try {
		currencyService.getService().getCurrenyRate(from, to, function (data) {
			if (!('err' in data))
				makeAjax(res, true, data);
			else
				makeAjax(res, false, null, data.err);
		});
	}
	catch (err) {
		Logger.error(err);
		makeAjax(res, false, null, err);
	}
});

_router.get('/historical', function (req, res) {
	let model = getmodel("", ['currency/historical.js']);
	model.main.data = currencyList;
	_render(res, 'currency/historical.ejs', model);
});


_router.get('/ajax/historical/:from/:to/:YYYMMDD', function (req, res) {
	const from = req.params.from;
	const to = req.params.to;
	let model = getmodel("");
	currencyService.getService().getHistorialRate(from, to, function () {
		model.main.data = currencyList;
		_render(res, 'currency/current.ejs', model);
	});
});
module.exports = _router;

