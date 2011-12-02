define(['Utils/toCamelCase', 'Utils/toHyphens'], function(toCamelCase, toHyphens){

	/**
	 * The getAppliedStyle method returns the current value of a specific CSS style property on a particular element
	 * 
	 * @param element { Element/Node } the element we wish to find the style value for
	 * @param styleName { String } the specific style property we're interested in
	 * @return style { String } the value of the style property found
	 */
 	var getAppliedStyle = function(element, styleName) {
 	 
		var style = "";
		
		if (window.getComputedStyle) { 
			//  W3C specific method. Expects a style property with hyphens 
			style = element.ownerDocument.defaultView.getComputedStyle(element, null).getPropertyValue(toHyphens(styleName)); 
		} 
		
		else if (element.currentStyle) { 
			// Internet Explorer-specific method. Expects style property names in camel case 
			style = element.currentStyle[toCamelCase(styleName)]; 
		}
		  
		return style;
		
	};
	
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
	
	return {
		style: getAppliedStyle,
		classes: getArrayOfClassNames,
		add: addClass,
		remove: removeClass,
		has: hasClass
	}

});