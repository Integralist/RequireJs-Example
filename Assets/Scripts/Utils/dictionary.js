define(function(){

	/**
	 * The following method is a Constructor with additional methods attached to the prototype
	 * which aid every time you need to check whether a property is present in an object.
	 * We approach an object as just a set of properties.
	 * And because we can use it to look things up by name, we will call it a 'Dictionary'.
	 * Lastly, as it's a constructor we'll use the correct naming convention of using a capitalised first letter.
	 *
	 * @notes for the prototype object see near bottom of script (after this __standardizer object definition has ended).
	 * @param {} x
	 * @return {} x
	 */
	var Dictionary = function(startValues) {
		this.values = startValues || {};
	};
	
	Dictionary.prototype = {
		
		/**
		 * The following method stores a new property and associated value
		 * 
		 * @param name { String } the property name to create
		 * @param value { Value } the value to store under the specified property name
		 * @return undefined {  } no explicitly returned value
		 */
		store: function(name, value) {
			this.values[name] = value;
		},
		
		/**
		 * The following method checks the object for a named property.
		 * 
		 * @param name { String } the property name to lookup 
		 * @return { Value } returns the value associated with the specified object property name
		 */
		lookup: function(name) {
			return this.values[name];
		},
		
		/**
		 * The following method checks the object for a named property.
		 * 
		 * @param name { String } the property name to check for
		 * @return { Boolean } returns whether the object contains a specified property name
		 */
		contains: function(name) {
			return Object.prototype.hasOwnProperty.call(this.values, name) && 
				   Object.prototype.propertyIsEnumerable.call(this.values, name);
		},
		
		/**
		 * The following method executes a function for every property in this object.
		 * 
		 * @param action { Function } a user specified callback function to execute for each property in this object
		 * @return undefined {  } no explicitly returned value
		 */
		each: function(action) {
			var object = this.values;
			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					action(property, object[property]);
				}
			}
		},
		
		/**
		 * The following method returns an Array of all property names within an object.
		 * 
		 * @return names { Array } a list of all property names in this object
		 */
		names: function() {
			var names = [];
			
			this.each(function(name, value) {
				names.push(name);
			});
			
			return names;
		}
		
	};
				
	return Dictionary;

});