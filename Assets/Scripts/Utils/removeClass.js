define(['Utils/getArrayOfClassNames'], function(getArrayOfClassNames){

	/**
	 * The removeClass method removes a given CSS class name from a given element
	 * 
	 * @param element { Element/Node } the element we want to remove a class name from
	 * @param className { String } the class name we want to remove
	 * @return undefined {  } no explicitly returned value
	 */
 	var removeClass = function(element, className) { 
 	
		var classNames = getArrayOfClassNames(element),
			resultingClassNames = []; // Create a new array for storing all the final CSS class names in 
        
		for (var index = 0, len = classNames.length; index < len; index++) { 
		
			// Loop through every class name in the list 
			if (className != classNames[index]) { 
			
				// Add the class name to the new list if it isn't the one specified 
				resultingClassNames.push(classNames[index]); 
				
			} 
			
		}
		  
		// Convert the new list into a  space- separated string and assign it 
		element.className = resultingClassNames.join(" "); 
		
	};
	
	return removeClass;

});