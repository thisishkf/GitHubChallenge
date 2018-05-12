const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('../Logger');
const config = require('../../config.json').MongoDB;

var state = {
	db: null
};

const _connect = function (url = null) {
	return new Promise((resolve, reject) => {
		if (state.db) {
			return resolve(state.db);
        }
        if(url === null){
            url = `mongodb://${config.account}:${config.password}@${config.mongoUri}/${config.database}`;
        }
		logger.info(`[MongoDB] Connecting to: ${url}`);
		try {
			MongoClient.connect(url, function (err, db) {
				assert.equal(err, null);
				logger.info(`[MongoDB] Connection build at ${Date()}`);
				state.db = db;
				resolve(state.db);
			});
		} catch (err) {
			reject({ err: "[MongoDB] Unable to connect MongoDB" });
		}
	});
}

const _get = function () {
	return state.db;
}

const _close = function (done) {
	if (state.db) {
		state.db.close(function (err, result) {
			state.db = null;
			done(err);
		});
	} else {
		done(err);
	}
}


module.exports ={
	connect : _connect,
	get : _get,
	close : _close
};