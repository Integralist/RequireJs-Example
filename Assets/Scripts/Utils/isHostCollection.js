define(function(){

	/*
	 * Feature Testing a Host Collection
	 * Because a callable host object can legitimately have any tyepof result then it can't be relied upon.
	 *
	 * 
	 * @reference: http://michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	 */

	function isHostCollection(object, property) {
		var type = typeof object[property];

		return (!!(type == "object" && object[property])) || // Protect against ES3 'null' typeof result being 'object'
			   type == "function"; // For Safari 3 typeof result being 'function' instead of 'object'
	}

	return isHostCollection;

});