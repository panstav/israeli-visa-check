var chalk = require('chalk');

module.exports = function(country, result, callback){

	var statusEffect;
	switch (result.visaStatus){

	case 'Admission refused':
		statusEffect = 'inverse';
		break;

	case 'Visa required':
		statusEffect = 'red';
		break;

	case 'Visa on arrival':
	case 'Visa not required':
	case 'Entry Permit on arrival':
	case 'Visitor\'s Permit on arrival':
		statusEffect = 'green';
		break;

	case 'eVisa':
	case 'e-Tourist Visa':
	case 'Electronic Travel Authorization':
		statusEffect = 'blue';
		break;

	default:
		statusEffect = 'reset';
	}

	var strToPrint = '\n\t' + chalk.bold(country) + ' - ' + chalk[statusEffect](result.visaStatus) + '\n';

	if (result.notes){
		strToPrint += '\tNotes: "' + result.notes.replace(/in the schengen area/i, chalk.bold('in the Schengen area')) + '"\n';
	}

	strToPrint += '\n\tMore details at:\n\t' + result.details + '\n';

	console.log(strToPrint);

	callback();

};