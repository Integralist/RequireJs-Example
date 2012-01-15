define(['Utils/getArrayOfClassNames', 'Utils/hasClass'], function(getArrayOfClassNames, hasClass){

	/**
	 * The addClass method adds a new CSS class of a given name to a particular element
	 * 
	 * @param element { Element/Node } the element we want to add a class name to
	 * @param className { String } the class name we want to add
	 * @return undefined {  } no explicitly returned value
	 */
 	var addClass = function(element, className) {
 	
		// Get a list of the current CSS class names applied to the element 
		var classNames = getArrayOfClassNames(element); 
		
		// Make sure the class doesn't already exist on the element
		if (hasClass(element, className)) {
			return;
		}
	   
		// Add the new class name to the list 
		classNames.push(className);
		
		// Convert the list in space-separated string and assign to the element 
		element.className = classNames.join(' '); 
		
	};
	
	return addClass;

});