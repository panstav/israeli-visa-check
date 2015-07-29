#! /usr/bin/env node

var minimist = require('minimist');
var visaCheck = require('./index');
var chalk = require('chalk');

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

	var visaStatusColor;
	switch (result.visaStatus){

	case 'Visa not required':
		visaStatusColor = 'green';
		break;

	case 'e-Tourist Visa':
		visaStatusColor = 'blue';
		break;

	default:
		visaStatusColor = 'red';
	}

	console.log('\n\t' + chalk.bold(countrysName) + ' - ' + chalk[visaStatusColor](result.visaStatus));
	if (result.notes) console.log('\tNotes: "' + result.notes + '"', '\n');
	console.log('\tMore details at:', '\n\t' + result.details + '\n');

	process.exit(0);

});