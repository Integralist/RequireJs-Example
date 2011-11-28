define(function(){
	
	var prevElementSibling = (function(){
		var supported = !!document.body.previousElementSibling,
			prev = (supported) ? 'previousElementSibling' : 'previousSibling';
	
		return function(currentElement) {
			return currentElement[prev];
		};
	}());
	
	var nextElementSibling = (function(){
		var supported = !!document.getElementsByTagName('head')[0].nextElementSibling,
			next = (supported) ? 'nextElementSibling' : 'nextSibling';
	
		return function(currentElement) {
			return currentElement[next];
		};
	}());
	
	return {
		prevElementSibling: prevElementSibling,
		nextElementSibling: nextElementSibling
	}
	
});