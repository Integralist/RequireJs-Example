define(function(){

	/**
	 * The following method inserts a specified element node into the DOM after the specified target element node.
	 * For some reason the DOM api provides different methods to acheive this functionality but no actual native method?
	 *
	 * @param newElement { Element/Node } new element node to be inserted
	 * @param targetElement { Element/Node } target element node where the new element node should be inserted after
	 * @return undefined {  } no explicitly returned value
	 */
	var insertAfter = function(newElement, targetElement) {
		var parent = targetElement.parentNode;
		
		(parent.lastChild == targetElement) 
			? parent.appendChild(newElement) 
			: parent.insertBefore(newElement, targetElement.nextSibling);
	}
	
	return insertAfter;

});