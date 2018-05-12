'use strict';
const express = require('express');
const { _render, getmodel, makeAjax } = require('../Services/Helper');

var _router = express.Router();
_router.get('/', function(req, res){
	res.status(200).end("/currency");
});
	
module.exports = _router ;

