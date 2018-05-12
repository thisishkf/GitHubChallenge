const _getmodel = function (title = "", script = []) {
	let model = {
		head: {
			meta: {
				title: `${title} CurrencyEx - GitHub Challenge`,
				description: "GitHub Challenge on Currency Exchange",
				keyword: "Currency, Rate, Exchange",
			},
			script: script
		},
		menu: {
			Currency: [
				{ title: 'Rates', uri: '/currency/', status: "active" },
			]
		},
		main: {},
		foot: { copyright: 'Copyright © 2018 Thisishkf. All rights reserved.' }
	};
	return model;
}

const _render = function (res, view, model) {
	model.view = view;
	res.render('index', model);
}

const _makeAjax = function (res, result = false, data = null, msg = '') {
	let responseData = { r: result, data: data, msg: msg };
	res.end(JSON.stringify(responseData));
}

module.exports = {
	getmodel: _getmodel,
	_render: _render,
	makeAjax: _makeAjax
};