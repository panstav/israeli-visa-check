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

	var strToPrint = '\n\t' + chalk.bold(country) + ' - ' + chalk[visaStatusColor](result.visaStatus) + '\n';

	if (result.notes){
		strToPrint += '\tNotes: "' + result.notes.replace(/in the schengen area/i, chalk.bold('in the Schengen area')) + '"\n';
	}

	strToPrint += '\n\tMore details at:\n\t' + result.details + '\n';

	console.log(strToPrint);

	callback();

};