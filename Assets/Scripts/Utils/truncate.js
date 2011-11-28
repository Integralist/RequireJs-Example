define(function(){

	var truncate = function(str, length, suffix) {
		length = length || 30;
		suffix = (typeof suffix == "undefined") ? '...' : suffix;
		
		// if the string isn't longer than the specified cut-off length then just return the original string
		return (str.length > length) ? /* next we borrow the String object's "slice()" method using the "call()" method */ String.prototype.slice.call(str, 0, length - suffix.length) + suffix : str;
	}
	
	return truncate;

});