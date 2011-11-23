require.config({ 
	paths: { 
		jsonp: 'Plugins/jsonp'
	} 
});

require(['jsonp!http://twitter.com/statuses/user_timeline/Integralist.json?callback=rjs_global', 
		 'jsonp!http://twitter.com/statuses/user_timeline/Barracat.json?callback=rjs_global', 
		 'jsonp!http://api.twitter.com/1/trends/available.json?callback=rjs_global'], function(feed1, feed2, feed3) {
	console.log('feed1: ', feed1);
	console.log('feed2: ', feed2);
	console.log('feed3: ', feed3);
});

require(['jsonp!JSON-P.php?callback=rjs_global'], function(feed4) {
	console.log('feed4: ', feed4);
});