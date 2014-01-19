var console = console || { log: function() {}};

var parseSnippet = function (snippet) {
	console.log(snippet);

	return {
		name: parseName(snippet),
		date: parseDate(snippet),
		description: parseDescription(snippet),
		image: parseImage(snippet)
	}
}

var parseName = function (snippet) {
	if (snippet.tvseries && snippet.tvseries.name) {
		return snippet.tvseries.name;
	}
}

var parseDescription = function (snippet) {
	if (snippet.tvseries && snippet.tvseries.description) {
		return snippet.tvseries.description;
	}
}

var parseImage = function (snippet) {
	if (snippet.tvseries && snippet.tvseries.image) {
		return {
			src: snippet.tvseries.image
		}
	}

	return snippet.cseThumbnail;
}

var parseDate = function (snippet) {
	var date;

	if (snippet.tvseries && snippet.tvseries.datepublished) {
		date = snippet.tvseries.datepublished;
	} else if (snippet.metatags && snippet.metatags.musicReleaseDate) {
		date = snippet.metatags.musicReleaseDate;
	}

	if (!date) {
		return;
	}

	date = date.replace(/-/, '');

	var matches = date.match(/^(\d{4})/);

	if (matches) {
		return matches[1];
	}
}

var parseDuration = function (duration) {
	if (!duration) {
		return '';
	}

	var test = /PT?(?:\d+H)?(\d+)M(\d+)S/;

	if (!duration.match(test)) {
		return '';
	}

	return duration.replace(test, function (match, minute, second) {
		while (minute.length < 2) {
			minute = '0' + minute;
		}

		while (second.length < 2) {
			second = '0' + second;
		}

		return minute + ':' + second;
	});
}