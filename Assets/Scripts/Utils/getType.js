define(function(){

	var doc = document;
	
	/**
	 * Following property stores a reference to the core Object's toString() method.
	 * This allows us to access JavaScript's internal [[Class]] property which helps us determine the type of certain primitives.
	 * This version was updated to use @cowboy's version: https://gist.github.com/1131946
	 * 
	 * Example Usage:
	 * 	getType([1, 2, 3]); 					// Array
	 * 	getType({ a: 1, b: 2, c: 3 }); 			// Object
	 * 	getType(123); 							// Number
	 * 	getType(new Date); 						// Date
	 * 	getType("String"); 						// String
	 * 	getType(window); 						// Global
	 * 
	 * Running {}.toString.call() doesn't work with null or undefined, because executing call() with null or undefined passes window as this.
	 * So for Null we check explicit value/type match, and after that if Null doesn't match then we check value is null so we know the obj is Undefined.
	 * 
	 * @return { String } a trimmed version of the internal [[Class]] value for the specified object (i.e. the object's true data type)
	 */
	var getType = (function() {
		
		var types = {};
		
		return function(obj) {
			var key;
			
			// If the object is null, return "Null" (IE <= 8)
			return obj === null ? "Null"
				// If the object is undefined, return "Undefined" (IE <= 8)
				: obj == null ? "Undefined"
				// If the object is the global object, return "Global"
				: obj === window ? "Global"
				// Otherwise return the XXXXX part of the full [object XXXXX] value, from cache if possible.
				: types[key = types.toString.call(obj)] || (types[key] = key.slice(8, -1));
		};
		
	}());
	
	return getType;

});