define(function(){

	/*
	 * Feature Testing a Host Object
	 * Because a callable host object can legitimately have any tyepof result then it can't be relied upon.
	 *
	 * 
	 * @reference: http://michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	 */

	function isHostObject(object, property) {
		return !!(typeof(object[property]) == 'object' && object[property]);
	}

	return isHostObject;

});