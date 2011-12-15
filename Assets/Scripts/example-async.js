require.config({ 
	paths: { 
		async: 'Plugins/async'
	} 
}); 
  
/*
	Instead of using define() to wrap our code, we use require(). 
	
	The require() function is similar, in that you pass it an optional array of dependencies, 
	and a function which will be executed when those dependencies are resolved. 
	However this code is not stored as a named module, as its purpose is to be run immediately.
*/

// you can use a "!callbackName" at the end of the URL 
// to specify name of parameter that expects callback function name
// the default value is "!callback" if not present.
require(['async!http://twitter.com/statuses/user_timeline/millermedeiros.json', 'async!http://maps.google.com/maps/api/js?sensor=false', 'Utils/random'], function(feed, empty, rand){

	console.log(rand);
    
    var feedDiv = document.getElementById('twitter-feed'),
        el;

    for (var i = 0, n = feed.length; i < n; i += 1) {
        el = document.createElement('p');
        el.innerHTML = feed[i].text;
        feedDiv.appendChild(el);
    }
    

    //Google maps is available and all components are ready to use.

    var mapDiv = document.getElementById('map-canvas');

    var map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    });

});

// I had to load twitter via a separate require() otherwise it wouldn't load

require(['async!http://twitter.com/statuses/user_timeline/Integralist.json'], function(feed) {
	console.log('twitter feed: ', feed);
});

// This originally failed (see ticket https://github.com/millermedeiros/requirejs-plugins/issues/7)
// Fix was to add !jsoncallback to the end instead of what Flickr suggested which was nojsoncallback=1
require(['async!http://api.flickr.com/services/feeds/photos_public.gne?id=49297289@N08&lang=en-us&format=json!jsoncallback'], function(feed){
	console.log('Flickr', feed);
});
