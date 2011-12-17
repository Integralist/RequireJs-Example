define(function(){

	/*
	 * Feature Testing a Host Method
	 * Because a callable host object can legitimately have any tyepof result, 
	 * the above code could produce false negatives.
	 *
	 * @notes:
	 * The reason for the && !!object[property] is because in ECMAScript version 3, 
	 * a null object has typeof result 'object' (which is considered a bug).
	 * In future versions (ECMAScript 5+) the typeof result will be 'null' (as it should be).
	 * 
	 * @reference: http://michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	 */

	function isHostMethod(object, property) {
		var type = typeof object[property];

		return type == "function" || // For Safari 3 returning 'function' instead of 'object'
			   (type == "object" && !!object[property]) || // Protect against ES3 'null' returning 'object'
			   type == "unknown"; // For Microsoft ActiveX objects
	}

	return isHostMethod;

});