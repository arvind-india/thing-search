var console = console || { log: function() {}};

var parseSnippet = function (snippet) {
	console.log(snippet);

	return {
		name: parseName(snippet),
		date: parseDate(snippet),
		description: parseDescription(snippet),
		image: parseImage(snippet),
		duration: parseDuration(snippet),
		rating: parseRating(snippet)
	}
}

var parseName = function (snippet) {
	if (snippet.movie && snippet.movie.name) {
		return snippet.movie.name.replace(/ \(\d+\)$/, '');
	}
}

var parseDescription = function (snippet) {
	if (snippet.movie && snippet.movie.description) {
		return snippet.movie.description;
	}
}

var parseImage = function (snippet) {
	if (snippet.movie && snippet.movie.image) {
		return {
			src: snippet.movie.image
		}
	}

	return snippet.cseThumbnail;
}

var parseDate = function (snippet) {
	var date;

	if (snippet.movie && snippet.movie.datepublished) {
		date = snippet.movie.datepublished;
	}

	if (!date) {
		return;
	}

	date = date.replace(/-/g, '');

	var matches = date.match(/^(\d{4})/);

	if (matches) {
		return matches[1];
	}
}

var parseDuration = function (snippet) {
	if (!snippet.movie.duration) {
		return null;
	}

	var matches = snippet.movie.duration.match(/PT?(\d+)M/);

	if (matches) {
		return matches[1] + '′';
	}
}

var parseRating = function(snippet) {
	if (snippet.aggregaterating && snippet.aggregaterating.ratingvalue &&  snippet.aggregaterating.bestrating) {
		var ratio = Number(snippet.aggregaterating.ratingvalue.replace(/\,/g, '.')) / Number(snippet.aggregaterating.bestrating);

		return Math.floor(ratio * 100) + '%';
	}
}