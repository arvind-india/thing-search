var console = console || { log: function() {}};

var parseSnippet = function (snippet) {
	console.log(snippet);

	if (typeof snippet.scholarlyarticle.slice != 'undefined') {
		snippet.scholarlyarticle = snippet.scholarlyarticle[0];
	}

	return {
		name: parseName(snippet),
		date: parseDate(snippet),
		description: parseDescription(snippet),
		image: parseImage(snippet),
		publisher: parsePublisher(snippet),
	}
}

var parseName = function (snippet) {
	if (snippet.scholarlyarticle.name) {
		return snippet.scholarlyarticle.name.replace(/ \(\d+\)$/, '');
	}
}

var parseDescription = function (snippet) {
	if (snippet.scholarlyarticle.description) {
		return snippet.scholarlyarticle.description;
	}

	if (snippet.scholarlyarticle.articlebody) {
		return snippet.scholarlyarticle.articlebody;
	}
}

var parseImage = function (snippet) {
	if (snippet.scholarlyarticle.image) {
		return {
			src: snippet.scholarlyarticle.image
		}
	}

	return snippet.cseThumbnail;
}

var parseDate = function (snippet) {
	if (snippet.scholarlyarticle.datepublished) {
		return snippet.scholarlyarticle.datepublished;
	}
}

var parsePublisher = function (snippet) {
	if (snippet.metatags.citationJournalTitle) {
		return snippet.metatags.citationJournalTitle;
	}
}
