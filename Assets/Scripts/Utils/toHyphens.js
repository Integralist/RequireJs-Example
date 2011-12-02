define(function(){

	/**
	 * The toHyphens method performs the opposite conversion, taking a camel case string and converting it into a hyphenated one.
	 * e.g. marginLeft becomes margin-left
	 * 
	 * @param camelCaseValue { String } camel cased string to be converted
	 * @return result { String } the hyphenated version of the string argument
	 */
 	var toHyphens = function(camelCaseValue) { 
		
		var result = camelCaseValue.replace(/[A-Z]/g, function(character) { 
			return ('-' + character.charAt(0).toLowerCase()); 
		});
	
		return result; 

	}
				
	return toHyphens;

});