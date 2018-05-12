const config = require('../../config.json').fixer.api.openexchangerates;
const { httpGet, httpPost } = require('../HTTPService');

const _getCurrenyRate = function (from, to, callback = function () { }) {
    const api = `${config.uri}/${config.lastest}`;
    const params = { app_id: config.API_KEY, base: from };
    httpGet(api, params, callback)
}

const _getHistorialRate = function (from, to, year, month, date, callback = function () { }) {
    var api = `${config.uri}/${config.historical}`;
    api = api.replace("YYYY", year).replace("MM", month).replace("DD", date);
    const params = { app_id: config.API_KEY, base: from };
    httpGet(api, params, callback)
}

module.exports = {
    getCurrenyRate: _getCurrenyRate,
    getHistorialRate : _getHistorialRate
}