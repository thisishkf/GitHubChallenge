const openexchangeratesService = require('./openexchangeratesService');

const currencyList = require('./currencies.json');
const Logger = reuqire('../Logger');

var service;

const _getService = function () {
    //TODO : factory module to select service
    Logger.debug("CurrencyService.getService() returning openexchangeratesService");
    return openexchangeratesService;
}

const _getCurrencyList = function(){
    return currencyList;
}

module.exports = {
    getService : _getService,
    getCurrencyList : _getCurrencyList
}