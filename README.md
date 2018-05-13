## Project Background

Key                 |   Value
------------------- | ---------------------
Author              |   Sam Ho <hkf1113@gmail.com>
Submission Date     |   2018-05-14
Technical spec      |   Back-end track
Language            |   Node.js
Problem             |   **Exchange Rate**

### Requirement: 
1. Create a **service** that gives the 
    1. latest exchange rate
    2. historical exchange rate 
2. Use **three tier network architecture**

## Solution
A Node.js application is created providing web-ui, and API service.

For web-ui, users can ask for 
- (1) latest exchange rate        at  /currency/current
- (2) historical exchange rate    at  /currency/historical

For API, users can ask for
- (1) latest exchange rate        at  /api/current/:from/:to
- (2) historical exchange rate    at  /api/historical/:from/:to/:date
- Please reference to `API Guide` section

## TODO
1. `CurrencyService.js` should be able to switch currency-data provider when one is down.
Current currency-data provider = https://openexchangerates.org
Backup currency-data provider = http://fixer.io
```javascript
const _setService = function (switchService) {
    //TODO : change Service when curreny service is down
    service = switchService;
}
```
2. Node.js Server does not need to call api to currency-data provider to get data. This can save of the use of currency-data api. (Some currency-data charge by number of calls)
    1. Historical exchange rate is static
    2. Latest exchange rate is update every (60 || 15 || 5) mintues
Therefore, Node.js Server can run a cronJob 
(1) to get Latest exchange rate every X mintues and save it into database.
(2) to get Historical exchange rate everyday and save it into database.
3. Improvement of the use of API service
The API service now is developped as everyone can use. The service can be mis-used by other people beyond the original design. 
A API-token can be deliverd and require in the request uri.
i.e. /api/current/:api-token/:from/:to and /api/historical/:api-token/:from/:to/:date
## API Guide