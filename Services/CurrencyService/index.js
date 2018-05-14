const openexchangeratesService = require('./openexchangeratesService');

const currencyList = require('./currencies.json');
const Logger = require('../../lib/Logger');

var service = openexchangeratesService;

/**
 * Get current active currency-data service
 * 
 * @return {Object} Current active currency-data service
 */
const _getService = function () {
    Logger.debug("CurrencyService.getService() returning openexchangeratesService");
    return service;
}

/**
 * 
 * @param {Object} switchService currency-data service
 */
const _setService = function (switchService) {
    //TODO : change Service when curreny service is down
    service = switchService;
}

/**
 * @return {JSON}   JSON Obecjt of available currencies
 */
const _getCurrencyList = function () {
    return currencyList;
}

module.exports = {
    getService: _getService,
    getCurrencyList: _getCurrencyList
}