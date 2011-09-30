define(function() {
	
	// Nothing should be declared outside of a single define call.
	// This code is saved in Assets/Scripts/Utils/random.js, so this module would be defined as "Assets/Scripts/Utils/random".
	
	function method (x) {
		return x + x;
	}
 
	return {
		someValue: 'foobar',
		myMethod: method
	}
	
});