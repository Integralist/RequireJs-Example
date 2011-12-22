define(['require', 'Utils/isHostMethod'], function(require, isHostMethod){

	var events = {
		
		add: (function(){
			var addEvent;
			
			if (isHostMethod(this, 'addEventListener')) {
				addEvent = function(element, type, handler) {
					element.addEventListener(type, handler, false);
					return 'added';
				};
			} 
			/*
			We no longer use attach/detachEvent for the following reasons:
				- Execution order is not guaranteed
				- Value of 'this' is the global object [Window] not the element itself
			
			else if (isHostMethod(this, 'attachEvent')) {
				addEvent = function(element, type, handler) {
					element.attachEvent('on' + type, handler);
					return 'added';
				};
			} 
			*/
			else {
				/*
				 * Complete credit for this method (and corresponding removeEvent) goes to Thomas 'PointedEars' Lahn.
				 * Although I've made slight tweaks to the code, majority of this function is the same as original.
				 * Original: http://pointedears.de/websvn/filedetails.php?repname=JSX&path=%2Ftrunk%2Fdom%2Fevents.js
				 * Reference: http://groups.google.com/group/comp.lang.javascript/browse_thread/thread/7f2a4731d991f6cd/2935311aaefb71ed?show_docid=2935311aaefb71ed
				 */
				addEvent = function(element, type, handler) {				
					var result = null,
						event_type = "on" + type;
					
					var oldListener = element[event_type];
	
					// If no listeners have been stored for this element/event type then create listener map… 
					if (!oldListener || typeof oldListener._listeners == "undefined") {
						var newListener = function(e) {
							// Assigning event listeners via property method (e.g. not using attachEvent or addEventListener)
							// means no event object is passed through, so we use IE's global event object
							if (!e) {
								// && operator reference: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Logical_Operators
								// expression1 && expression2 = if expression1 is false return that, if not then return expression 2
								// e.g.
								// false && true ==> false (expression1)
								// true && false ==> false (expression2)
								// 
								// So the below equates to:
								// (typeof window != "undefined" && window) returns window - as the first expression equates to true
								// (typeof window.event != "undefined" && window.event) returns window.event - as the first expression equates to true
								// (window && window.event) which itself returns window.event - as the first expression equates to true								
								e = ((typeof window != "undefined" && window) && (typeof window.event != "undefined" && window.event));
							}
							
							var listeners = arguments.callee._listeners,
								fpCall = Function.prototype.call;
							
							for (var i = 0, len = listeners.length; i < len; i++) {
								/* May be undefined because _replaceEventListener() was applied */
								if (typeof listeners[i] == 'function') {
									/* Host object's methods need not implement call() */
									// We also pass through a normalised event object
									fpCall.call(listeners[i], this, {
										type: e.type,
										target: e.srcElement,
										relatedTarget: (function(event){
											// relatedTarget is only used with mouse over/out events
											var rt;
											
											if (event.type == 'mouseover') { 
												rt = event.fromElement; 
											} 
											else if (event.type == 'mouseout') { 
												rt = event.toElement; 
											}
											
											return rt;
										}(e)),
										stopPropagation: function(){
											e.cancelBubble = true;
											return 'stopped';
										},
										preventDefault: function(){
											e.returnValue = false;
											return 'prevented';
										}
									});
								}
							}
						};
					
						newListener._listeners = [];
					
						if (oldListener) {
							/* Avoid dependencies, so no Array.prototype.push() call */
							listeners = newListener._listeners;
							listeners[listeners.length] = oldListener;
						}
					
						oldListener = newListener;
					}
					
					listeners = oldListener._listeners;
					listeners[listeners.length] = handler;
					
					/* TODO: Why this way? */
					element[event_type] = oldListener;
					
					result = (element[event_type] == oldListener) && oldListener || null;
					
					return 'added';
				};
			}
			
			return addEvent;
		}()),
		
		remove: (function(){
			var removeEvent;
			
			if (isHostMethod(this, 'removeEventListener')) {
				removeEvent = function(element, type, handler) {
					element.removeEventListener(type, handler, false);
					return 'removed';
				};
			}
			/*
			We no longer use attach/detachEvent for the following reasons:
				- Execution order is not guaranteed
				- Value of 'this' is the global object [Window] not the element itself
			
			else if (isHostMethod(this, 'detachEvent')) {
				removeEvent = function(element, type, handler) {
					element.detachEvent('on' + type, handler);
					return 'removed';
				};
			} 
			*/
			else {
				removeEvent = function(element, type, handler) {
					var result = false,
						event_type = "on" + type;
					
					// Precaution to make sure required arguments were passed through
					if (element && type) {
						// If the supplied element has the specified event type
						if (isHostMethod(element, event_type)) {
							// Grab list of handler functions associated with this event
							var list = element[event_type],
								listeners = list._listeners;
				      
				      		// Precaution to make sure a list was returned
							if (listeners) {
								// Loop through each associated handler function to see if the handler argument matches
								for (var i = listeners.length; i--;) {
									// If it does then delete that handler function from the list
									if (listeners[i] == handler) {
										delete listeners[i];
										result = (typeof listeners[i] == "undefined");
									}
								}
							} 
							// If only one handler (i.e. no list of handlers) then just set that handler to null so the event type is completely removed
							else {
								handler = element[event_type] = null;
								result = (handler == null);
							}
				    	}
					}
					
					return 'removed';
				};
			}
			
			return removeEvent;
		}())
		
	};
	
	return events;

});