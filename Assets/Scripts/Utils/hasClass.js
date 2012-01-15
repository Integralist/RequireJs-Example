define(['Utils/getArrayOfClassNames'], function(getArrayOfClassNames){

	/**
	 * The hasClass method returns true if a given class name exists on a specific element, false otherwise
	 * 
	 * @param element { Element/Node } the element we want to check whether a class name exists on
	 * @param className { String } the class name we want to check for
	 * @return isClassNamePresent { Boolean } if class name was found or not
	 */
 	var hasClass = function(element, className) { 
 	
		// Assume by default that the class name is not applied to the element 
		var isClassNamePresent = false,
			classNames = getArrayOfClassNames(element); 
        
		for (var index = 0, len = classNames.length; index < len; index++) { 
		
			// Loop through each CSS class name applied to this element 
			if (className == classNames[index]) { 
			
				// If the specific class name is found, set the return value to true 
				isClassNamePresent = true; 
				
			} 
			
		} 
        
		// Return true or false, depending on if the specified class name was found 
		return isClassNamePresent; 
		
	};
	
	return hasClass;

});