define(function(){

	var doc = document;
	
	/**
	 * Following method is short hand for document.getElementById
	 * This can help improve performance by not having to keep looking up scope chain for either 'document' or 'getElementById'
	 * 
	 * @param id { String } the identifier for the element we want to access.
	 * @return { Element | Undefined } either the element we require or undefined if it's not found
	 */
	var getEl = function(id) {
		return doc.getElementById(id);
	};
	
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
	
	/**
	 * The following method returns the height of the document/page.
	 * If the actual document’s body height is less than the viewport height then it will return the viewport height instead.
	 *
	 * @return { Integer } the height of the document/page ()
	 */
	var getDocHeight = function() {
		var body = doc.body,
			elem = doc.documentElement;
			 
		return Math.max(
			Math.max(body.scrollHeight, elem.scrollHeight),
			Math.max(body.offsetHeight, elem.offsetHeight),
			Math.max(body.clientHeight, elem.clientHeight)
		);
	};

	return {
		el: getEl,
		tag: getTag,
		docheight: getDocHeight
	};

});