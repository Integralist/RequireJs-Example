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
require(['App/people'], function(iCanCallThisAnythingILike) {

	// The argument passed through is the returned value from the function definition we defined inside App/people.js
	console.log(iCanCallThisAnythingILike.list, iCanCallThisAnythingILike.scripts);
	
});