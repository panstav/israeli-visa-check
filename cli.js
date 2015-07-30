#! /usr/bin/env node

var minimist = require('minimist');
var visaCheck = require('./index');
var printToCli = require('./print-to-cli');

var argv;
var escapedArguments = process.argv.slice(2);

if (escapedArguments.length === 1){
	argv = { country: escapedArguments[0] };

} else {
	argv = minimist(process.argv.slice(2), {

		alias: {
			country: 'c'
		}

	});
}

visaCheck(argv, function(err, result){

	if (err){
		console.log(err);

		process.exit(1);
	}

	var countrysName = argv.country[0].toUpperCase() + argv.country.substr(1);
	printToCli(countrysName, result, function(){
		process.exit(0);
	});

});