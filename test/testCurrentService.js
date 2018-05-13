const assert = require('assert');
/**
 * 
 */
describe('CurrencyService', () => {
    const currencyService = require('../Services/CurrencyService');
    it('contains config',  (done) => {
        const config = require('../config.json');
        if (!('Currency' in config)) {
            throw new Error('CurrencyService not containing correct config');
        }
        done();
    });
    /**
     * 
     */
    describe('_getService()', () => {
        it('return a service', (done) => {
            try {
                currencyService.getService();
                done();
            } catch (err) {
                throw new Error('getService() fail');
            }
        });
        it('return service have getCurrenyRate() ', (done) => {
            try {
                currencyService.getService().getCurrenyRate("USD", "USD", function (data) {
                    done();
                });
            } catch (err) {
                throw new Error('getCurrenyRate() fail');
            }
        });
        it('return service have getHistorialRate() ', (done) => {
            try {
                currencyService.getService().getHistorialRate("USD", "USD", "2018-01-01", function (data) {
                    done();
                });
            } catch (err) {
                throw new Error('getCurrenyRate() fail');
            }
        });
    });
    /**
     * 
     */
    describe('_getCurrencyList()', () => {
        it('return a json', (done) => {
            let result = typeof (currencyService.getCurrencyList());
            assert.equal(result, 'object');
            done();
        });
    });
});

describe('openexchangeratesService', () => {
    const config = require(__dirname + '/../config.json').Currency.api.openexchangerates;
    const openexchangeratesService = require('../Services/CurrencyService/openexchangeratesService');
    it('API KEY is valid', (done) => {
        const { httpGet } = require('../lib/HTTPService');
        const api = `${config.uri}${config.lastest}`;
        const params = { app_id: config.API_KEY, base: "USD" };
        try {
            httpGet(api, params, function (data) {
                if ('status' in data && data.status == 401) {
                    throw new Error('API KEY Is not valid');
                }
                done();
            });
        } catch (err) {
            throw new Error(`${err}`);
        }
    });
    describe('_getCurrenyRate()', () => {
        it('return a array', (done) => {
            openexchangeratesService.getCurrenyRate("USD", "USD", function (data) {
                let result = Array.isArray(data);
                assert(result, true);
                done();
            });
        });
    });
    describe('_getHistorialRate()', () => {
        it('return a array', (done) => {
            openexchangeratesService.getHistorialRate("USD", "USD", "2018-01-01", function (data) {
                let result = Array.isArray(data);
                assert(result, true);
                done();
            });
        });
    });
});