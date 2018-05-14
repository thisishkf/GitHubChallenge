# Github Challenge - AfterShip

## Project Background

Key                 |   Value
------------------- | ---------------------
Author              |   Sam Ho <hkf1113@gmail.com>
Submission Date     |   2018-05-14
Technical spec      |   Back-end track
Language            |   Node.js
Problem             |   **Exchange Rate**
Production Link     |   http://52.90.250.226:9999/
Hosting Provider    |   Amazon Ec2 free-tier

### Requirement: 
1. Create a **service** that gives the 
    1. latest exchange rate
    2. historical exchange rate 
2. Use **three tier network architecture**
//TODO
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

### Coding level
#### Architecture
```
    GitHubChallenge/
    ├── Controller
    │   └── CurrencyController.js
    │   └── IndexController.js
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
- Controller : Contains all routing activies. Router with different prefix will be seperated into different `.js` file.
- lib : Contains all self-written modules where those modules will/does not published to NPM.
    - HTTPSerive : responsible for making `GET` and `POST` request in HTTP or HTTPS.
    - MongoService : respsible for Mongo Databse Operations.
    - Helper : responsible for making ajax response, making page reponse.
    - Logger : responsible for logging into console and file.
- public : Contains all prsentation Layer elements.
    - views : Despite of common, each module shuold contains of a individual folder. i.e. `/index` and `/currency`. 
    - static/js : If a page is contain generic javascript, a `.js` file is put here under the module name.
- Services : Generic modules under business logics. each module shuold contains of a individual folder. i.e. `/CurrencyService`.

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
- child_process : Use for Monitor
- mongo     :   Prepare as database (Not used)

##### Other
- Logger. <br/>
Logger is included as console logger and logged to file. <br/>
See lib/Logger.
- Monitor. <br/> 
A simple monitor is included. <br/> 
For personal use, we always use pm2 as it is well developed and widely used. <br/>
However for some concerns for commercial use, generic monitor is better.

### Network architecture
**3-tier architecture**
1. Presentation Layer: Client Side browser or API call
2. Business Logic Layer : Node.js Server hosted on AWS
3. Data Access Layer : Currrency-data provider and Mongo Database on mlab


## Limitation
Free currency-data providers only provide limited service. <br/>
For openexchangerates.org, base currency only support **USD** for free API. <br/>
Also, it is limited to 1,000 calls for a account. <br/>
i.e. Please use **USD** as base currency for testing and dont use heavy stress test.

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

---

2. Saving the use of currency-data API. <br/>
Node.js Server does not need to call api to currency-data provider to get data.<br/>
This can save of the use of currency-data API. (Some currency-data charge by number of calls)
    1. Historical exchange rate is static
    2. Latest exchange rate is update every (60 || 15 || 5) mintues
Therefore, Node.js Server can run a cronJob <br/>
(1) to get Latest exchange rate every X mintues and save it into database.<br/>
(2) to get Historical exchange rate everyday and save it into database.

---

3. Improvement of the use of API service. <br/>
The API service now is developped as everyone can use. The service can be mis-used by other people beyond the original design. <br/>
A API-token can be deliverd and require in the request uri. <br/>
i.e. `/currency/api/current/:api-token/:from/:to` and `/currency/api/historical/:api-token/:from/:to/:date`

---

4. Improvement of checking historial date. <br/>
The Today's date is base on server time. Therefore user in different timezone may have liitle impact. <br/>
Therefore, today's timestamp should send by client side or retrieving by express request object.
```javascript
const testHistorialDate = function (date) {
    let format = /^\d{4}-\d{2}-\d{2}$/.test(date);
    let today = (new Date()).getTime();
    let target = (new Date(date)).getTime();
    return today > target && format;
}
```

## Production Test Log
ubuntu@ip-172-31-24-214:~/GitHubChallenge$ npm test
```
> githubchallenge@0.0.1 test /home/ubuntu/GitHubChallenge
> mocha

  CurrencyService
    ✓ contains config
    _getService()
 Mon 14 02:42:57 [4081][DEBUG]	 	CurrencyService.getService() returning openexchangeratesService
      ✓ return a service
 Mon 14 02:42:57 [4081][DEBUG]	 	CurrencyService.getService() returning openexchangeratesService
 Mon 14 02:42:57 [4081][DEBUG]	 	Getting current Exchange Rate from USD to USD
 Mon 14 02:42:57 [4081][DEBUG]	 	httpRequest openexchangerates.org/api/latest.json?app_id=972b78c45db448b29419fc73dd93a840&base=USD statusCode: 200
      ✓ return service have getCurrenyRate()  (41ms)
 Mon 14 02:42:57 [4081][DEBUG]	 	CurrencyService.getService() returning openexchangeratesService
 Mon 14 02:42:57 [4081][DEBUG]	 	Getting current Exchange Rate from USD to USD at 2018-01-01
2018-01-01
 Mon 14 02:42:57 [4081][DEBUG]	 	httpRequest openexchangerates.org/api/historical/2018-01-01.json?app_id=972b78c45db448b29419fc73dd93a840&base=USD statusCode: 200
      ✓ return service have getHistorialRate() 
    _getCurrencyList()
      ✓ return a json
  openexchangeratesService
 Mon 14 02:42:57 [4081][DEBUG]	 	httpRequest openexchangerates.org/api/latest.json?app_id=972b78c45db448b29419fc73dd93a840&base=USD statusCode: 200
    ✓ API KEY is valid
    _getCurrenyRate()
 Mon 14 02:42:57 [4081][DEBUG]	 	Getting current Exchange Rate from USD to USD
 Mon 14 02:42:57 [4081][DEBUG]	 	httpRequest openexchangerates.org/api/latest.json?app_id=972b78c45db448b29419fc73dd93a840&base=USD statusCode: 200
      ✓ return a array
    _getHistorialRate()
 Mon 14 02:42:57 [4081][DEBUG]	 	Getting current Exchange Rate from USD to USD at 2018-01-01
 Mon 14 02:42:57 [4081][DEBUG]	 	httpRequest openexchangerates.org/api/historical/2018-01-01.json?app_id=972b78c45db448b29419fc73dd93a840&base=USD statusCode: 200
      ✓ return a array

  8 passing (124ms)
```
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
http://52.90.250.226:9999/currency/api/current/USD/HKD

**Result**
```
    [{"to":"HKD","ts":1526220003,"rate":7.8498,"from":"USD"}]
```

---

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
http://52.90.250.226:9999/currency/api/historical/USD/GBP/2018-04-04 

**Result**
```
[{"to":"GBP","ts":1522886399,"rate":0.709832,"from":"USD"}]
```

---

#### Errors
- If Country Code is provided incorrectly, the response data will give an error message.
```
    "Target Currency Code is invalid"
```

- If Historial Date is provided incorrectly, the response data will give an error message. <br/>
For example, it is not the Date before today or it is not is YYYY-MM-DD. <br/>
```
    "Historial Date is invlaid"
```
