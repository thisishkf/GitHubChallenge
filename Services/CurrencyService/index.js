const openexchangeratesService = require('./openexchangeratesService');

const currencyList = require('./currencies.json');
var service;

const _getService = function () {
    //TODO : factory module to select service
    return openexchangeratesService;
}

const _getCurrencyList = function(){
    return currencyList;
}

module.exports = {
    getService : _getService,
    getCurrencyList : _getCurrencyList
}