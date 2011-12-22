define(function(){

	/**
	 * Event management
	 * 
	 * Based on: addEvent/removeEvent written by Dean Edwards, 2005
	 * http://dean.edwards.name/weblog/2005/10/add-event/
	 * http://dean.edwards.name/weblog/2005/10/add-event2/
	 * 
	 * It doesn't utilises the DOM Level 2 Event Specification (http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/ecma-script-binding.html)
	 * Instead it uses the traditional DOM Level 1 methods along with a hash map object to correlate the different listeners/handlers.
	 * 
	 * Originally I had used a branching technique for add/removeEventListener (W3C) & add/detachEvent (IE).
	 * But discovered that trying to standardise the event object for a listener was impossible because it meant wrapping the callback in a function.
	 * And within that function then executing the callback and passing through a normalised event object.
	 * Problem is the removeEventListener can't remove listeners for anonymous functions.
	 * 
	 * e.g. this doesn't work...
	   
		element.addEventListener(eventType, function(e) {
			handler(events.standardize(e));
		}, false); 
    
	 */
	var events = {
	
		/**
		 * A counter to generate a unique event handler ID
		 */
		id: 1,
	
		/**
		 * The add method allows us to assign a function to execute when an event of a specified type occurs on a specific element
		 * 
		 * @param element { Element/Node } the element that will have the event listener attached
		 * @param eventType { String } the event type, e.g. 'click' that will trigger the event handler
		 * @param handler { Function } the function that will execute as the event handler
		 * @return undefined {  } no explicitly returned value
		 */
		add: function(element, eventType, handler) {
			
			// Normalise user input
			eventType = eventType.toLowerCase();

			// Assign each event handler function a unique ID (via a static property '$$guid')
			if (!handler.$$guid) { 
				handler.$$guid = events.id++;
			}
			
			// Create hash table of event types for the element.
			// As there could be different events for the same element.
			if (!element.events) { 
				element.events = {};
			}
			
			// Create hash table of event handlers for each element/event pair
			var handlers = element.events[eventType];
			if (!handlers) {
				// If no eventType found then create empty hash for it
				handlers = element.events[eventType] = {};

				// Store the current event handler.
				// As each eventType could have multiple handlers needed to be executed for it.
				if (element["on" + eventType]) {
					handlers[0] = element["on" + eventType];
				}
			}
			
			// Store the event handler in the hash table
			handlers[handler.$$guid] = handler;
			
			// Assign a global event handler to do all the work
			element["on" + eventType] = events.handler;
			
		},
		
		/**
		 * The remove method allows us to remove previously assigned code from an event
		 * 
		 * @param element { Element/Node } the element that will have the event listener detached
		 * @param eventType { String } the event type, e.g. 'click' that triggered the event handler
		 * @param handler { Function } the function that was to be executed as the event handler
		 * @return undefined {  } no explicitly returned value
		 */
		remove: function(element, eventType, handler) {
		
			// Normalise user input
			eventType = eventType.toLowerCase();
			
			// Delete the event handler from the hash table
			if (element.events && element.events[eventType]) {
				delete element.events[eventType][handler.$$guid];
			}
			
		},
	
		/**
		 * This method handles the event hash map object and executes each event handler for each event type stored
		 */
		handler: function(e) {
		
			var returnValue = true,
				 handlers,
				 fn;

			// Standardise the event object
			e = e || window.event;
			
			// If you try and pass e to standardize method without first checking for e || window.event then a race condition issue happens with IE<8
			e = events.standardize(e);
			
			// Get a reference to the hash table of event handlers
			handlers = this.events[e.type];

			// Execute each event handler
			for (var i in handlers) {
				// Store current handler to be executed
				fn = handlers[i];
				
				// If after executing the function it's return value is false, then explicitly set the return value
				if (fn(e) === false) {
					returnValue = false;
				}
			}
			
			return returnValue;
			
		},
						
		/**
		 * The standardize method produces a unified set of event properties, regardless of the browser
		 * 
		 * @param event { Object } the event object associated with the event that was triggered
		 * @return anonymous { Object } an un-named object literal with the relevant event properties normalised
		 */
	 	standardize: function(event) { 
		
			// These two methods, defined later, return the current position of the 
			// mouse pointer, relative to the document as a whole, and relative to the 
			// element the event occurred within 
			var page = this.getMousePositionRelativeToDocument(event),
				 offset = this.getMousePositionOffset(event),
				 type = event.type;
			
			// Let's stop events from firing on element nodes above the current...
			
			// W3C method 
			if (event.stopPropagation) { 
				event.stopPropagation(); 
			} 
			
			// Internet Explorer method 
			else { 
				event.cancelBubble = true; 
			}
			
			// We return an object literal containing seven properties and one method 
			return { 
			
				// The event type
				type: type,
				
				// The target is the element the event occurred on 
				target: this.getTarget(event), 
				
				// The relatedTarget is the element the event was listening for, 
				// which can be different from the target if the event occurred on an 
				// element located within the relatedTarget element in the DOM 
				relatedTarget: this.getRelatedTarget(event), 
				
				// If the event was a  keyboard- related one, key returns the character 
				key: this.getCharacterFromKey(event), 
				
				// Return the x and y coordinates of the mouse pointer, 
				// relative to the document 
				pageX: page.x, 
				pageY: page.y, 
				
				// Return the x and y coordinates of the mouse pointer, 
				// relative to the element the current event occurred on 
				offsetX: offset.x, 
				offsetY: offset.y, 
				
				// The preventDefault method stops the default event of the element 
				// we're acting upon from occurring. If we were listening for click 
				// events on a hyperlink, for example, this method would stop the 
				// link from being followed 
				preventDefault: function() {
				 
				 	// W3C method
					if (event.preventDefault) {
						event.preventDefault();
					} 
					
					// Internet Explorer method
					else { 
						event.returnValue = false; 
					} 
					
				}
				
			};
			
		},
		
		/**
		 * The getTarget method locates the element the event occurred on
		 * 
		 * @param event { Object } the event object associated with the event that was triggered
		 * @return target { Element/Node } the element that was the target of the triggered event
		 */
	 	getTarget: function(event) { 
		
			// Internet Explorer value is srcElement, W3C value is target 
			var target = event.srcElement || event.target; 
			
			// Window resize event causes 'undefined' value for target
			if (target !== undefined) {
				// Fix legacy Safari bug which reports events occurring on a text node instead of an element node 
				if (target.nodeType == 3) { // 3 denotes a text node 
					target = target.parentNode; // Get parent node of text node 
				}
			}
			
			// Return the element node the event occurred on 
			return target;
			 
		},
		
		/**
		 * The getCharacterFromKey method returns the character pressed when keyboard events occur. 
		 * You should use the keypress event as others vary in reliability
		 * 
		 * @param event { Object } the event object associated with the event that was triggered
		 * @return character { String } the character pressed when keyboard events occurred
		 */
	 	getCharacterFromKey: function(event) {
		 
			var character = "",
				 keycode; 
			
			// Internet Explorer 
			if (event.keyCode) {
				keycode = event.keyCode;
				character = String.fromCharCode(event.keyCode); 
			} 
			
			// W3C 
			else if (event.which) {
				keycode = event.which;
				character = String.fromCharCode(event.which); 
			} 
			
			return { code:keycode, character:character };
			
		},
		
		/**
		 * The getMousePositionRelativeToDocument method returns the current mouse pointer position relative to the top left edge of the current page.
		 * 
		 * @param event { Object } the event object associated with the event that was triggered
		 * @return anonymous { Object } the x and y coordinates
		 */
	 	getMousePositionRelativeToDocument: function(event) { 
			
			var x = 0, y = 0; 
			
			// pageX gets coordinates of pointer from left of entire document 
			if (event.pageX) { 
				x = event.pageX; 
				y = event.pageY; 
			} 
			
			// clientX gets coordinates from left of current viewable area 
			// so we have to add the distance the page has scrolled onto this value 
			else if (event.clientX) { 
				x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
				y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
			}
			
			// Return an object literal containing the x and y mouse coordinates 
			return { 
				x: x, 
				y: y 
			};
			
		},
		
		/**
		 * The getMousePositionOffset method returns the distance of the mouse pointer from the top left of the element the event occurred on
		 * 
		 * @param event { Object } the event object associated with the event that was triggered
		 * @return anonymous { Object } the x and y coordinates of the mouse relative to the element
		 */
	 	getMousePositionOffset: function(event) {
		 
			var x = 0, y = 0; 
		
			if (event.layerX) { 
				x = event.layerX; 
				y = event.layerY; 
			}
			
			// Internet Explorer proprietary
			else if (event.offsetX) { 
				x = event.offsetX; 
				y = event.offsetY; 
			} 
			
			// Returns an object literal containing the x and y coordinates of the mouse relative to the element the event fired on 
			return { 
				x: x, 
				y: y 
			};
			
		},
		
		/**
		 * The getRelatedTarget method returns the element node the event was set up to fire on, 
		 * which can be different from the element the event actually fired on
		 * 
		 * @param event { Object } the event object associated with the event that was triggered
		 * @return relatedTarget { Element/Node } the element the event was set up to fire on
		 */
	 	getRelatedTarget: function(event) { 
		
			var relatedTarget = event.relatedTarget; 
			
			// With mouseover events, relatedTarget is not set by default 
			if (event.type == "mouseover") { 
				relatedTarget = event.fromElement; 
			} 
			
			// With mouseout events, relatedTarget is not set by default
			else if (event.type == "mouseout") { 
				relatedTarget = event.toElement; 
			}
			
			return relatedTarget; 
			
		}
		
	};
	
	return events;

});