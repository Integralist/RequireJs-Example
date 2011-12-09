define(function(){

	var doc = document;
	
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
	
	return getDocHeight;

});