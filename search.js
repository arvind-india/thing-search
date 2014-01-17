google.load('search', '1');

google.setOnLoadCallback(function() {
	var customSearchControl = new google.search.CustomSearchControl('003954572918023580770:ck4bt1ykq6u');

	customSearchControl.setSearchStartingCallback(this, function(control, searcher, query) {
		searcher.setQueryAddition('more:pagemap:musicrecording');
	    searcher.setResultSetSize(5);
	});

	customSearchControl.draw('search-results');
}, true);