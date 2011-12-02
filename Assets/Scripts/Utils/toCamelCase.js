define(function(){

	/**
	 * The toCamelCase method takes a hyphenated value and converts it into a camel case equivalent.
	 * e.g. margin-left becomes marginLeft. 
	 * Hyphens are removed, and each word after the first begins with a capital letter.
	 * 
	 * @param hyphenatedValue { String } hyphenated string to be converted
	 * @return result { String } the camel case version of the string argument
	 */
 	var toCamelCase = function(hyphenatedValue) { 
		
		var result = hyphenatedValue.replace(/-\D/g, function(character) { 
			return character.charAt(1).toUpperCase(); 
		}); 
		
		return result;
		 
	}
	
	return toCamelCase;

});