define(function(){

	var doc = document;
	
	/**
	 * Following method is short hand for document.getElementsByTagName
	 * This can help improve performance by not having to keep looking up scope chain for either 'document' or 'getElementsByTagName'
	 * Also allows us to return the first found element if we so choose.
	 * 
	 * @param options { Object } object literal of options
	 * @param tag { String } the HTML tag to search for (e.g. 'div')
	 * @param context { Element/Node } an element to anchor the search by (defaults to window.document)
	 * @param first { Boolean } determines if we return the first element or the entire HTMLCollection
	 * @return { Element | HTMLCollection/Array | Undefined } either the element(s) we require or undefined if it's not found
	 */
	var getTag = function(options) {
		var tag = options.tag || '*', 
			context = options.context || doc, 
			returnFirstFound = options.first || false;
		
		return (returnFirstFound) 
			? context.getElementsByTagName(tag)[0] 
			: context.getElementsByTagName(tag);
	};
	
	return getTag;

});