define(['Utils/Events'], function(events){

	// Test Suite
	describe('Event methods tests', function() {
			
		function handler(e) {
			alert(e);
		}
		
		// Spec
		it('should return string when load event triggered', function() {			
			
			expect(events.add(window, 'load', handler)).toBe('added');
			
		});
		
		// Spec
		it('should return string when load event removed', function() {			
			
			expect(events.remove(window, 'load', handler)).toBe('removed');
			
		});
		
	});

});