var cheerio = require('cheerio');

module.exports = function(requestedCountry, doc, callback){

	var $ = cheerio.load(doc);
	var tables = $('.wikitable');

	var result;

	// doc has a few tables, go over each
	for (var h = 0, tablesLen = tables.length; h < tablesLen; h++){
		var i = h.toString();

		var rows = $(tables[i]).find('tr');

		// skip thead tr
		for (var j = 1, rowsLen = rows.length; j < rowsLen; j++){
			var k = j.toString();

			// some tables have the country name in a th tag
			// other tables have rows with only a th representing a header for a section of the table

			var countryCells = $(rows[k]).find('th');
			var cells = $(rows[k]).find('td');
			var countryName;

			if (countryCells.length){
				countryName = $(countryCells[0]).text().trim().toLowerCase();

				if (countryName === requestedCountry){
					result = {
						visaStatus: $(cells[0]).text().trim().replace(/[[0-9]+]/g, ''),
						notes: $(cells[1]).text().trim() || null,
						details: fetchCiteNote(($(cells[0]).text().trim().match(/[0-9]+/))[0])
					};

					break;
				}
			} else {
				countryName = $(cells[0]).text().trim().toLowerCase();

				if (countryName === requestedCountry){
					result = {
						visaStatus: $(cells[1]).text().trim().replace(/[[0-9]+]/g, ''),
						notes: $(cells[2]).text().trim() || null,
						details: fetchCiteNote(($(cells[1]).text().trim().match(/[0-9]+/))[0])
					};

					break;
				}
			}
		}

		if (result) break;
	}

	function fetchCiteNote(citeNoteNum){
		return $('#cite_note-' + (parseInt(citeNoteNum, 10)+1) + ' .external')['0'].attribs.href;
	}

	if (!result) return callback(new Error('Country "' + requestedCountry + '" was not found.'));

	callback(null, result)

};