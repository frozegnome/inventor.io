'use strict'

// Production Environment

module.exports = {
	mongo: {

		// IP Address
		ip: process.env.OPENSHIFT_NODEJS_IP ||
			process.env.IP ||
			undefined,

		// Port
		port: process.env.OPENSHIFT_NODEJS_PORT ||	
			  process.env.PORT ||
			  8080,

		// Connecting to MongoDB via MongoLab, MongoHQ, localhost etc. for Production
		uri: process.env.MONGOLAB_URI ||
			 process.env.MONGOHQ_URL ||
			 process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
			 'mongodb://localhost/inventorio'
	}
};