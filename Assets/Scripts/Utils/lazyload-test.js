// For us to use an 'inner' require() method call 
// we need to pass through 'require' (without quotes) as an argument to the module definition function
define(function(require) {
	
	return {
		// this isn't the full require() method, but a subset one that only accepts a single string path
        random: require('Utils/random') // remember that the paths are relative to the main directory 'Assets/Scripts/'
    };
	
});