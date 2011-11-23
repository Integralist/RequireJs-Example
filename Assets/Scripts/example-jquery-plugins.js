// For details see: 
// http://groups.google.com/group/requirejs/browse_thread/thread/e7532b7e3013bc62/1e5ca8a89b276de6?show_docid=1e5ca8a89b276de6
require.config({ 
	paths: { 
		jquery: 'Utils/jquery' 
	} 
}); 
  
/*
	Instead of using define() to wrap our code, in this (our 'main' file) we use require(). 
	
	The require() function is similar, in that you pass it an optional array of dependencies, 
	and a function which will be executed when those dependencies are resolved. 
	However this code is not stored as a named module, as its purpose is to be run immediately.
*/
require(['Utils/jquery.carousel'], function(){
	
	$('#carousel').jCarouselLite({
		auto: 2000, // move every two seconds
		speed: 1000, // complete the animation in one second
		visible: 5, // there are eight items in total but only display five
		beforeStart: function(item) {
			console.log('beforeStart', item);
		},
		afterEnd: function(item) {
			console.log('afterEnd', item);
		}
	});
	
});