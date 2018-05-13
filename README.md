## Project Background

Key                 |   Value
------------------- | ---------------------
Author              |   Sam Ho <hkf1113@gmail.com>
Submission Date     |   2018-05-14
Technical spec      |   Back-end track
Language            |   Node.js
Problem             |   **Exchange Rate**
Production Link     |   

### Requirement: 
1. Create a **service** that gives the 
    1. latest exchange rate
    2. historical exchange rate 
2. Use **three tier network architecture**

## Solution
### Application level
A Node.js application is created providing web-ui, and API service.

For web-ui, users can ask for 
- (1) latest exchange rate        at  `/currency/current`
- (2) historical exchange rate    at  `/currency/historical`

For API, users can ask for
- (1) latest exchange rate        at  `/currency/api/current/:from/:to`
- (2) historical exchange rate    at  `/currency/api/historical/:from/:to/:date`
- Please reference to `API Guide` section

## Limitation
Free currency-data providers only provide limited service. <br/>
For openexchangerates.org, base currency only support **USD** for free API. <br/>
Also, it is limited to 1,000 calls for a account. <br/>
i.e. Please use **USD** as base currency for testing and dont use heavy stress test.

### Coding level
#### Architecture
```
    GitHubChallenge/
    ├── Controller
    ├── Services
    │   └── CurrencyService
    ├── lib
    │   ├── HTTPService
    │   ├── Helper
    │   ├── Logger
    │   └── MongoService
    ├── node_modules
    ├── public
    │   ├── static
    │   │   ├── css
    │   │   ├── images
    │   │   ├── js
    │   │   │   └── currency
    │   │   └── vendor
    │   └── views
    │       ├── common
    │       │   └── head
    │       ├── currency
    │       └── index
    └── test
    └── config.json
    └── app.js
    └── monitor.js
```


#### UX
There is limited UX provided.
- The web-ui is using bootstrap responsive design.
- Ajax Loading when ajax call is made

#### Technical choices
##### Libraries
- ejs       :   Web template engine
- express   :   Web framework
- assert    :   Use for assertion tests 
- fs        :   Use for file IO. i.e. Writing Logger to file
- mocha     :   Use for building automation testing 
- http      :   Use for making http request
- https     :   Use for making https request
- url       :   Use for parsing URLs

## TODO
1. Backup currency-data provider. <br/>
`CurrencyService.js` should be able to switch currency-data provider when one is down. <br/>
Current currency-data provider = https://openexchangerates.org <br/>
Backup currency-data provider = http://fixer.io <br/>
```javascript
const _setService = function (switchService) {
    //TODO : change Service when curreny service is down
    service = switchService;
}
```
2. Saving the use of currency-data API. <br/>
Node.js Server does not need to call api to currency-data provider to get data.<br/>
This can save of the use of currency-data API. (Some currency-data charge by number of calls)
    1. Historical exchange rate is static
    2. Latest exchange rate is update every (60 || 15 || 5) mintues
Therefore, Node.js Server can run a cronJob <br/>
(1) to get Latest exchange rate every X mintues and save it into database.<br/>
(2) to get Historical exchange rate everyday and save it into database.

3. Improvement of the use of API service. <br/>
The API service now is developped as everyone can use. The service can be mis-used by other people beyond the original design. <br/>
A API-token can be deliverd and require in the request uri. <br/>
i.e. `/currency/api/current/:api-token/:from/:to` and `/currency/api/historical/:api-token/:from/:to/:date`

## API Guide
This section is to provide user guide in using API service for getting currency exchange rate.

### API for getting Latest exchange rate
#### Latest exchange rate
Latest exchange rate can be retrieved by calling `GET /currency/api/current/:from/:to`. <br/>

Parameter   |   Description
----------- | -------------
from        |   The base currency code
to          |   The target exchange currency code

The currency code are in three capital letters. <br/>
Currency codes can be lookup on https://github.com/thisishkf/GitHubChallenge/blob/master/Services/CurrencyService/currencies.json . <br/>
There is also `allCurrency` as an extra option for `to` to retrieve all currency exchange rate base on `from`.

##### Example
/currency/api/current/USD/HKD

**Result**
```
    [{"to":"HKD","ts":1526220003,"rate":7.8498,"from":"USD"}]
```

#### Historial exchange rate
Historial exchange rate can be retrieved by calling `GET /currency/api/current/:from/:date`. <br/>

Parameter   |   Description
----------- | -------------
from        |   The base currency code
to          |   The target exchange currency code
date        |   The historial date in format YYYY-MM-DD

The currency code are in three capital letters. <br/>
Currency codes can be lookup on https://github.com/thisishkf/GitHubChallenge/blob/master/Services/CurrencyService/currencies.json . <br/>
There is also `allCurrency` as an extra option for `to` to retrieve all currency exchange rate base on `from`.

##### Example
/currency/api/historical/USD/GBP/2018-04-04

**Result**
```
[{"to":"GBP","ts":1522886399,"rate":0.709832,"from":"USD"}]
```

#### Errors
- If Country Code is provided incorrectly, the response data will give an error message `Error, target Currency Code is invalid` in `res.data.rate`
```
    [{"to":"qwe","ts":1522886399,"rate":"Error, target Currency Code is invalid","from":"USD"}]
```

----

- If Historial Date in provided incorrectly. <br/>
For example, it is not the Date before today or it is not is YYYY-MM-DD. <br/>
