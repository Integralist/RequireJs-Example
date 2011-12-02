define(function(){

	/**
	 * The following method is a direct copy from Douglas Crockfords json2.js script (https://github.com/douglascrockford/JSON-js/blob/master/json2.js)
	 * It is used to replicate the native JSON.parse method found in most browsers.
	 * e.g. IE<8 hasn't got a native implementation.
	 * 
	 * @return { Object } a JavaScript Object Notation (JSON) compatible object
	 */
	var json = function(text) {
		// The parse method takes a text and returns a JavaScript value if the text is a valid JSON text.
		var j,
			 cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		
		function walk(holder, key) {
			// The walk method is used to recursively walk the resulting structure so that modifications can be made.
			var k, v, value = holder[key];
			if (value && typeof value === 'object') {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = walk(value, k);
						if (v !== undefined) {
							value[k] = v;
						} else {
							delete value[k];
						}
					}
				}
			}
			return reviver.call(holder, key, value);
		}
		
		// Parsing happens in four stages. In the first stage, we replace certain
		// Unicode characters with escape sequences. JavaScript handles many characters
		// incorrectly, either silently deleting them, or treating them as line endings.
		text = String(text);
	    cx.lastIndex = 0;
	    if (cx.test(text)) {
	    	text = text.replace(cx, function(a) {
	       		return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			});
	    }
    
    	// In the second stage, we run the text against regular expressions that look
		// for non-JSON patterns. We are especially concerned with '()' and 'new'
		// because they can cause invocation, and '=' because it can cause mutation.
		// But just to be safe, we want to reject all unexpected forms.
		
		// We split the second stage into 4 regexp operations in order to work around
		// crippling inefficiencies in IE's and Safari's regexp engines. First we
		// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
		// replace all simple value tokens with ']' characters. Third, we delete all
		// open brackets that follow a colon or comma or that begin the text. Finally,
		// we look to see that the remaining characters are only whitespace or ']' or
		// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.				
		if (/^[\],:{}\s]*$/
			.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		
			// In the third stage we use the eval function to compile the text into a
			// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
			// in JavaScript: it can begin a block or an object literal. We wrap the text
			// in parens to eliminate the ambiguity.				
			j = eval('(' + text + ')');
		
			// In the optional fourth stage, we recursively walk the new structure, passing
			// each name/value pair to a reviver function for possible transformation.				
			return typeof reviver === 'function' ? walk({'': j}, '') : j;
		}
		
		// If the text is not JSON parseable, then a SyntaxError is thrown.				
		throw new SyntaxError('JSON.parse');
	}
			
	return json;

});