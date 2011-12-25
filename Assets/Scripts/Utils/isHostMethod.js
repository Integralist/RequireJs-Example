define(function(){

	/*
	 * Feature Testing a Host Method
	 * Because a callable host object can legitimately have any tyepof result then it can't be relied upon.
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

		return type == 'function' || // For Safari 3 typeof result being 'function' instead of 'object'
			   (type == 'object' && !!object[property]) || // Protect against ES3 'null' typeof result being 'object'
			   type == 'unknown' || // For IE < 9 when Microsoft used ActiveX objects for Native Functions
			   type == 'string'; // typeof for 'document.body[outerHTML]' results in 'string'
	}

	return isHostMethod;

});