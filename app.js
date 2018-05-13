// Use NPM modules
const http = require('http');
const url = require('url');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');

// User Generic Modules
const config = require(__dirname + '/config');
const Logger = require(__dirname + '/lib/Logger');
const mongo = require(__dirname + '/lib/MongoService');

// use Middle-ware
app.use(function (req, res, next) {
	Logger.access(req);
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public/static'));

// use controllers

app.use('', require(__dirname + '/controller/IndexController'));
app.use('/currency', require(__dirname + '/controller/CurrencyController'));

const port = process.env.PORT || config.PORT;
server.listen(port, function () {
	mongo.connect()
		.then(db => {
			Logger.info(`Server created: listening ${port}`);
		})
		.catch(({ err }) => {
			Logger.error(err);
		});

});

