var console = console || { log: function() {}};

var parseSnippet = function (snippet) {
	console.log(snippet);

	return {
		artist: parseArtist(snippet),
		album: parseAlbum(snippet),
		date: parseDate(snippet),
		description: parseDescription(snippet),
		image: parseImage(snippet),
		audio: parseAudio(snippet)
	}
}

var parseArtist = function (snippet) {
	if (snippet.musicalbum && snippet.musicalbum.byartist) {
		if (typeof snippet.musicalbum.byartist == 'string') {
			return snippet.musicalbum.byartist;
		}

		if (typeof snippet.musicalbum.byartist == 'object') {
			if (snippet.musicalbum.byartist.name) {
				return snippet.musicalbum.byartist.name;
			}
		}
	}

	if (snippet.musicgroup && snippet.musicgroup.name) {
		return snippet.musicgroup.name;
	}
}

var parseAlbum = function (snippet) {
	if (snippet.musicalbum && snippet.musicalbum.name) {
		return snippet.musicalbum.name;
	}
}

var parseDescription = function (snippet) {
	if (snippet.musicalbum && snippet.musicalbum.description) {
		return snippet.musicalbum.description;
	}
}

var parseImage = function (snippet) {
	if (snippet.musicalbum && snippet.musicalbum.image) {
		return {
			src: snippet.musicalbum.image
		}
	}

	return snippet.cseThumbnail;
}

var parseDate = function (snippet) {
	var date;

	if (snippet.musicalbum && snippet.musicalbum.datepublished) {
		date = snippet.musicalbum.datepublished;
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


var parseAudio = function(snippet) {
	if (!snippet.audioobject) {
		return null;
	}

	if (typeof snippet.audioobject.slice != 'undefined') {
		return snippet.audioobject.slice(0, 1);
	}

	return [snippet.audioobject];
}