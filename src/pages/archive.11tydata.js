const {year, month, monthName, dayOrdinal} = require('@mikestreety/11ty-utils/filters/date');

module.exports = {
	diary: function() {
		// Select the collection we want to loop
		let entries = this.ctx.collections.posts,
			// Create our placeholder array
			output = [];

		// Loop through each of the entries
		for(let item of entries) {
			// Check we have both a date and title
			if(item.data.title && item.date) {
				// Extract the year and month number (Jan = 0)
				let y = year(item.date),
					m = month(item.date);

				// If the year hasn't been seen before, make a stub object
				if(!output[y]) {
					output[y] = {
						title: y,
						months: []
					};
				}

				// If the month hasn't been seen before, make a stub object
				// with a nice month name as the title
				if(!output[y].months[m]) {
					output[y].months[m] = {
						title: monthName(item.date),
						entries: []
					};
				}

				// Add the entry to the keyed year/month array - only add the info we need
				output[y].months[m].entries.push({
					title: item.data.title,
					url: item.url,
					type: item.data.parent,
					publication: item.data.publication ? item.data.publication : false,
					// This is just the date plus ordinal (e.g. 23rd)
					date: dayOrdinal(item.date),
				});
			}
		}

		// Return our array
		return output
			// Reverse the months (most recent first)
			.map(y => {
				y.months.reverse();
				return y;
			})
			// Filter out any null years
			.filter(a => a)
			// Reverse the years (recent first)
			.reverse();
	 }
}