define(function(){

	/**
	 * Following method determines the left/top position of the target element.
	 * This is so we can more accurately position specific elements.
	 *
	 * @param elem { Node } the target element
	 * @param end { String } id value for the top most element we want to check against
	 * @return { Object } object containing x and y position for specified element
	 */
	var getOffset = function(elem, end) {
		var _x = 0,
			 _y = 0;
		
		while (elem && !isNaN(elem.offsetLeft) && !isNaN(elem.offsetTop)) {
			// Store the x and y co-ordinates of the current element
			_x += elem.offsetLeft - elem.scrollLeft;
			_y += elem.offsetTop - elem.scrollTop;
			
			// Then move onto the next element up (and we keep going all the way to the top of the document unless stopped)
			// We use offsetParent instead of parentNode (like the original script had) because the offsetLeft/Top adds on extra un-needed dimensions!
			elem = elem.offsetParent;
			
			/*
				In the following if conditional…
				
				We need to avoid a situation where the <body> tag isn't considered an offsetParent and so the browser continues up until null is returned
				OR
				We can specify an elements id as the top level element to top checking for
				OR
				We can pass through '_now_' as the end value which means the check stops immediately
				OR
				Failing the id or _now_ we can try and stop at the document.body element (which will only work if the body is considered an offsetParent)
			 */
			if (elem == null || elem.id === end || end === '_now_' || elem.tagName.toLowerCase() === 'body') {
				break;
			}
		}
		
		return { top: _y, left: _x };
	};
	
	return getOffset;

});