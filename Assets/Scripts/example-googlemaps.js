require.config({ 
	paths: {
		jquery: 'Utils/jquery',
		underscore: 'Utils/underscore'
	} 
}); 
 
require(['App/googlemap'], function(gmap){

	var map = new gmap;
    	map.createMap($("#map-canvas")[0]);

    $("#search-box").keydown(function(event) {
        if (event.keyCode === 13) {
            var text = $(this).val();
            map.search(text);
        }
    });

    window.setTimeout(function(){ 
    	$("#note").fadeOut(); 
    }, 5000);

});
