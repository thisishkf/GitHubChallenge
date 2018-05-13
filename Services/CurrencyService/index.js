const openexchangeratesService = require('./openexchangeratesService');

const currencyList = require('./currencies.json');
const Logger = require('../../lib/Logger');

var service = openexchangeratesService;

const _getService = function () {
    Logger.debug("CurrencyService.getService() returning openexchangeratesService");
    return service;
}

const _setService = function (switchService) {
    //TODO : change Service when curreny service is down
    service = switchService;
}

const _getCurrencyList = function () {
    return currencyList;
}

module.exports = {
    getService: _getService,
    getCurrencyList: _getCurrencyList
}