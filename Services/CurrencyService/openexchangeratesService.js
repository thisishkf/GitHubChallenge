const config = require('../../config.json').Currency.api.openexchangerates;
const { httpGet, httpPost } = require('../HTTPService');
const Logger = require('../Logger');
/**
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
 * 
 * @param {string}      from        Base Currency
 * @param {string}      to          Target Currency
 * @param {string}      year        Target Historical Year
 * @param {string}      month       Target Historical Month
 * @param {string}      date        Target Historical Date
 * @param {callback}    callback 
 */
const _getHistorialRate = function (from, to, year, month, date, callback = function () { }) {
    var api = `${config.uri}${config.historical}`;
    api = api.replace("YYYY", year).replace("MM", month).replace("DD", date);
    const params = { app_id: config.API_KEY, base: from };
    httpGet(api, params, function (data) {
        callback(data);
    });
}

/**
 * 
 * @private
 * @param {string}  from 
 * @param {string}  to 
 * @param {JSOn}    data    
 */
const makeModel = function (from, to, data) {
    let result = [];
    if (to != "allCurrency") {
        let row = {};
        row.to = to;
        row.ts = data.timestamp;
        row.rate = data.rates[to];
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