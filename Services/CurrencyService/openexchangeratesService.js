const config = require(__dirname + '/../../config.json').Currency.api.openexchangerates;
const { httpGet, httpPost } = require(__dirname + '/../../lib/HTTPService');
const Logger = require(__dirname + '/../../lib/Logger');

/**
 * Getting Current Exchange Rate by calling api of openexchangerates.org.
 * 
 * @param {string}      from        Base Currency
 * @param {string}      to          Target Currency
 * @param {callback}    callback 
 */
const _getCurrenyRate = function (from, to, callback = function () { }) {
    Logger.debug(`Getting current Exchange Rate from ${from} to ${to}`);
    const api = `${config.uri}${config.lastest}`;
    const params = { app_id: config.API_KEY, base: from };
    httpGet(api, params, function (data) {
        callback(makeModel(from, to, data));
    });
}

/**
 * Getting Historial Exchange Rate by calling api of openexchangerates.org,
 * have to replace YYYY-MM-DD for the api
 * 
 * @param {string}      from        Base Currency
 * @param {string}      to          Target Currency
 * @param {string}      year        Target Historical Year
 * @param {string}      month       Target Historical Month
 * @param {string}      date        Target Historical Date
 * @param {callback}    callback 
 */
const _getHistorialRate = function (from, to, date, callback = function () { }) {
    Logger.debug(`Getting current Exchange Rate from ${from} to ${to} at ${date}`);
    var api = `${config.uri}${config.historical}`.replace("YYYY-MM-DD", date);
    const params = { app_id: config.API_KEY, base: from };
    httpGet(api, params, function (data) {
        callback(makeModel(from, to, data));
    });
}

/**
 * Making response Model
 * 
 * @private
 * @param {string}  from 
 * @param {string}  to 
 * @param {JSOn}    data    HTTP Request response data in form of {
 *                                                                  "disclaimer": {string}, 
 *                                                                  "license": {url},
 *                                                                  "timestamp": {timestamp}
 *                                                                  "base": {string},
 *                                                                  "rates": {JSON Object}
 *                                                                  }
 */
const makeModel = function (from, to, data) {
    let result = [];
    if (to != "allCurrency") {
        let row = {};
        row.to = to;
        row.ts = data.timestamp;
        row.rate = ( to in data.rates) ? data.rates[to] : "Error, target Currency Code is invalid";
        row.from = from;
        result.push(row);
    } else {
        Object.keys(data.rates).forEach(currency => {
            let row = {};
            row.to = currency;
            row.ts = data.timestamp;
            row.rate = data.rates[currency];
            row.from = from;
            result.push(row);
        });
    }
    return result;
}

module.exports = {
    getCurrenyRate: _getCurrenyRate,
    getHistorialRate: _getHistorialRate
}