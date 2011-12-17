define(function(){

	/*
	 * Feature Testing a Host Collection
	 * Because a callable host object can legitimately have any tyepof result, 
	 * the above code could produce false negatives.
	 *
	 * 
	 * @reference: http://michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	 */

	function isHostCollection(object, property) {
		var type = typeof object[property];

		return (!!(type == "object" && object[property])) || // Protect against ES3 'null' returning 'object'
			   type == "function"; // For Safari 3 returning 'function' instead of 'object'
	}

	return isHostCollection;

});