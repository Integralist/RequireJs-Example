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
	
	return getAppliedStyle;

});