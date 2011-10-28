require.config({ 
	paths : { 
		async : 'Utils/async'
	} 
}); 
  
/*
	Instead of using define() to wrap our code, we use require(). 
	
	The require() function is similar, in that you pass it an optional array of dependencies, 
	and a function which will be executed when those dependencies are resolved. 
	However this code is not stored as a named module, as its purpose is to be run immediately.
*/

require(['async!http://maps.google.com/maps/api/js?sensor=false!callback', 'Utils/random'], function(empty, rand) {

	// async is undefined but still loads the random.js utility script
	console.log(rand);
	
	//Google maps is available and all components are ready to use
    var mapDiv = document.getElementById('map-canvas'),
    	map = new google.maps.Map(mapDiv, {
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

require(['async!http://twitter.com/statuses/user_timeline/Integralist.json?callback'], function(feed) {
	console.log(feed);
});