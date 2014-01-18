function durationToTime(duration) {
	if (!duration) {
		return '';
	}

	var test = /PT?(?:\d+H)?(\d+)M(\d+)S/;

	if (!duration.match(test)) {
		return '';
	}

	var time = duration.replace(test, function (match, minute, second) {
		while (minute.length < 2) {
			minute = '0' + minute;
		}

		while (second.length < 2) {
			second = '0' + second;
		}

		return minute + ':' + second;
	});

	return ' (' + time + ')';
}