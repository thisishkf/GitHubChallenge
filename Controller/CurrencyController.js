'use strict';
const express = require('express');
const { _render, getmodel, makeAjax } = require('../Services/Helper');
const currencyService = require('../Services/CurrencyService');
const currencyList = currencyService.getCurrencyList();
const Logger = require('../Services/Logger');
var _router = express.Router();

_router.get('/current', function (req, res) {
	Logger.debug("Getting Current Exchange Rate Page");
	let model = getmodel("", ['currency/current.js']);
	model.main.data = currencyList;
	_render(res, 'currency/current.ejs', model);
});

_router.get('/ajax/current/:from/:to', function (req, res) {
	const from = req.params.from;
	const to = req.params.to;
	Logger.debug(`Ajax getting current exchange rate for ${from} => ${to}`);
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
	Logger.debug("Getting Historial Exchange Rate Page");
	let model = getmodel("", ['currency/historical.js']);
	model.main.data = currencyList;
	_render(res, 'currency/historical.ejs', model);
});


_router.get('/ajax/historical/:from/:to/:date', function (req, res) {
	const from = req.params.from;
	const to = req.params.to;
	const date = req.params.date;
	Logger.debug(`Ajax getting Historial exchange rate for ${from} => ${to} at ${date}`);
	let model = getmodel("");
	try {
		currencyService.getService().getHistorialRate(from, to, date, function (data) {
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

module.exports = _router;

