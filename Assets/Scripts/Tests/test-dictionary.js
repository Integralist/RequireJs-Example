define(['Utils/getType', 'Utils/dictionary'], function(getType, Dictionary){

	// Test Suite
	describe('Dictionary tests', function() {
		
		// Dictionary
		var colourMap = {
				red: '#FF0000',
				yellow: '#FFFF00',
				pink: '#FF00FF',
				green: '#00FF00',
				orange: '#FF6600',
				purple: '#9900FF',
				blue: '#0000FF'
			}, 
			colours = new Dictionary(colourMap);
		
		// Add our own matcher to check if an object is an Array
		beforeEach(function() {
			this.addMatchers({
				toBeArray: function(expected) {
					return getType(this.actual) === 'Array' ? true : false;
				}
			});
		});
		
		// Spec
		it('should add a new "white" property', function() {			
			
			colours.store('white', '#FFFFFF');
			expect(colours.lookup('white')).toBe('#FFFFFF');
			
		});
		
		// Spec
		it('should find the specified colour and return its value', function() {			
			
			expect(colours.lookup('red')).toBe('#FF0000');
			
		});
		
		// Spec
		it('should return boolean whether the specified property could be found', function() {			
			
			expect(colours.contains('orange')).toBeTruthy();
			expect(colours.contains('Orange')).toBeFalsy();
			
		});
		
		// Spec
		it('should loop through all object properties', function() {			
			
			colours.each(function(name, val) {
				expect(name).toBeDefined();
			});
			
		});
		
		// Spec
		it('should return an Array of property', function() {			
			
			expect(colours.names()).toBeArray();
			
		});
		
	});

});