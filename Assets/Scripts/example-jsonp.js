require.config({ 
	paths: { 
		jsonp: 'Plugins/jsonp'
	} 
});

/*
 * The following examples do not need a 'callback' method specified (ONLY IF the api of the service uses 'callback' as its standard mechanism).
 * e.g.
 * 		jsonp!http://twitter.com/statuses/user_timeline/Integralist.json?!callback
 * 		jsonp!JSON-P.php?!callback
 * can be…
 * 		jsonp!http://twitter.com/statuses/user_timeline/Integralist.json
 * 		jsonp!JSON-P.php
 *
 * It wont work for something like Flickr where they do not use the standard naming convention of 'callback' but 'jsoncallback'
 * e.g.
 * 		jsonp!http://api.flickr.com/services/feeds/photos_public.gne?id=49297289@N08&lang=en-us&format=json&jsoncallback=my_callback_function
 * So you have to specify the callback still using !CALLBACK_NAME
 * e.g. 
 * 		jsonp!http://api.flickr.com/services/feeds/photos_public.gne?id=49297289@N08&lang=en-us&format=json!jsoncallback
 */

require(['jsonp!http://twitter.com/statuses/user_timeline/Integralist.json', 
		 'jsonp!http://twitter.com/statuses/user_timeline/Barracat.json', 
		 'jsonp!http://api.twitter.com/1/trends/available.json'], function(feed1, feed2, feed3) {
	console.log('feed1 (Twitter): ', feed1);
	console.log('feed2 (Twitter): ', feed2);
	console.log('feed3 (Twitter): ', feed3);
});

require(['jsonp!JSON-P.php'], function(feed4) {
	console.log('feed4 (Custom PHP code which purposely delayed response): ', feed4);
});

// Currently this fails (see ticket https://github.com/millermedeiros/requirejs-plugins/issues/7)
require(['jsonp!http://twitter.com/statuses/user_timeline/Integralist.json'], function(feed5) {
	console.log('feed5 (Twitter plain JSON): ', feed5);
});

// This originally failed (see ticket https://github.com/millermedeiros/requirejs-plugins/issues/7)
// Fix was to add !jsoncallback to the end instead of what Flickr suggested which was nojsoncallback=1
// Had to update the plugin to use the same technique @millermedeiros' had used in his plugin
require(['jsonp!http://api.flickr.com/services/feeds/photos_public.gne?id=49297289@N08&lang=en-us&format=json!jsoncallback'], function(feed){
	console.log('Flickr', feed);
});

