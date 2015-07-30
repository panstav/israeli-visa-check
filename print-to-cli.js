var chalk = require('chalk');

module.exports = function(country, result, callback){

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

	console.log('\n\t' + chalk.bold(country) + ' - ' + chalk[visaStatusColor](result.visaStatus));

	if (result.notes){
		result.notes = result.notes.replace(/in the schengen area/i, chalk.bold('in the Schengen area'));
		
		console.log('\tNotes: "' + result.notes + '"', '\n')
	}

	console.log('\tMore details at:', '\n\t' + result.details + '\n');

	callback();

};