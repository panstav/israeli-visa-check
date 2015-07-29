var request = require('request');

var fetchVisaStatus = require('./fetch-visa-status');

function visaCheck(options, callback){

	request('https://en.wikipedia.org/wiki/Visa_requirements_for_Israeli_citizens', function(err, res, body){

		if (err){
			return callback(err);
		}

		if (!options.country){
			return callback(new Error('No country was selected.'));
		}

		fetchVisaStatus(options.country.toLowerCase(), body, callback);

	});
}

module.exports = visaCheck;