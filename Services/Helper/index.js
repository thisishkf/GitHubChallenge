/**
 * Make Page Model for rendering ejs
 * 
 * @param {string} 	title 	using for SEO
 * @param {array} 	script	Array of string that giving js path. 
 */
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
		menu: [
				{ title: 'Home', uri: '/', status: "active" },
				{ title: 'Current Rates', uri: '/currency/current', status: "active" },
				{ title: 'Historical Rate', uri: '/currency/historical', status: "active" }
		],
		main: {},
		foot: { copyright: 'Copyright © 2018 Thisishkf. All rights reserved.' }
	};
	return model;
}

/**
 * Use for making EJS reponse rending
 * 
 * @param {Object} res 		Express response Object
 * @param {string} view 	dynamic picking ejs view
 * @param {Object} model	use for rendering ejs
 */
const _render = function (res, view, model) {
	model.view = view;
	res.render('index', model);
}

/**
 * use for making ajax response
 * 
 * @param {Object} 	res 	Express response Object
 * @param {boolean} result 	result of ajax call
 * @param {JSON} 	data 	ajax response body
 * @param {string} 	msg 	extra response message
 */
const _makeAjax = function (res, result = false, data = null, msg = '') {
	let responseData = { r: result, data: data, msg: msg };
	res.end(JSON.stringify(responseData));
}

module.exports = {
	getmodel: _getmodel,
	_render: _render,
	makeAjax: _makeAjax
};