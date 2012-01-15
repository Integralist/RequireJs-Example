define(function(){

	/**
	 * The getArrayOfClassNames method is a utility method which returns an array of all the CSS class names assigned to a particular element.
	 * Multiple class names are separated by a space character
	 * 
	 * @param element { Element/Node } the element we wish to retrieve class names for
	 * @return classNames { String } a list of class names separated with a space in-between
	 */
 	var getArrayOfClassNames = function(element) {
 	
		var classNames = []; 
		
		if (element.className) { 
			// If the element has a CSS class specified, create an array 
			classNames = element.className.split(' '); 
		} 
		
		return classNames;
		
	};
	
	return getArrayOfClassNames;

});