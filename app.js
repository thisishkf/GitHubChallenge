// Use NPM modules
const http = require('http');
const url = require('url');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');

// User Generic Modules
const config = require('./config');
const Logger = require('./lib/Logger');
const mongo = require('./lib/MongoService');

// use Middle-ware
app.use(function (req, res, next) {
	Logger.access(req);
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public/static'));

// use controllers

app.use('', require('./controller/IndexController'));
app.use('/currency', require('./controller/CurrencyController'));

const port = process.env.PORT || config.PORT;
server.listen(port, function () {
	mongo.connect()
	.then(db => {
		Logger.info(`Server created: listening ${port}`);
	})
	.catch(({err}) => {
		Logger.error(err);
	});
	
});

