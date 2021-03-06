define(['Utils/getArrayOfClassNames', 'Utils/addClass', 'Utils/hasClass', 'Utils/removeClass'], function(classes, add, has, remove){

	// Test Suite
	describe('CSS tests', function() {
		
		var h2 = document.getElementsByTagName('h2')[0];
		
		beforeEach(function() {
			// Reset the className before each spec is run
			h2.className = 'myclassa myclassb';
  		});
		
		// Spec
		it('should return an Array of class names', function() {			
			
			expect(classes(h2)).toEqual(['myclassa', 'myclassb']);
			expect(classes(h2).length).toBe(2);
			
		});
		
		// Spec
		it('should add class to element', function() {			
			
			add(h2, 'newclass');
			expect(h2.className).toBe('myclassa myclassb newclass');
			
		});
		
		// Spec
		it('should return a boolean for whether the class is on the given element', function() {			
			
			expect(has(h2, 'myclassa')).toBeTruthy();
			expect(has(h2, 'newclass')).toBeFalsy();
			
		});
		
		// Spec
		it('should remove class from element', function() {			
			
			remove(h2, 'myclassb');
			expect(h2.className).toBe('myclassa');
			
		});
		
	});

});