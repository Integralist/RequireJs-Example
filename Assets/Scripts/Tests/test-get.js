define(['Utils/getType', 'Utils/get'], function(getType, get){

	// Test Suite
	describe('Get methods tests', function() {
		
		var h2 = document.getElementsByTagName('h2')[0];
		
		// Add our own matcher to check if an object is an Array
		beforeEach(function() {
			this.addMatchers({
				toBeArray: function(expected) {
					return getType(this.actual) === 'Array' ? true : false;
				}
			});
			
			this.addMatchers({
				toBeNumber: function(expected) {
					return /\d+/.test(this.actual);
				}
			});
		});
		
		// Spec
		it('should return the element with the specified id', function() {			
			
			expect(get.el('mytest')).not.toBeNull();
			
		});
		
		// Spec
		it('should return the first h2 element', function() {			
			
			expect(get.tag({ tag:'h2', first:true })).not.toBeNull();
			
		});
		
		// Spec
		it('should return all h2 elements as an NodeList', function() {
			
			// Can't check if the returned value is an Array as it's actually a NodeList.
			// Also can't check against the string NodeList because in IE it returns Object instead.
			// So the best we can do is check if it's not undefined. 
			expect(get.tag({ tag:'h2' })).toBeDefined();
			
		});
		
		// Spec
		it('should return the height of the document', function() {			
			
			expect(get.docheight()).toBeNumber();
			
		});
		
		// Spec
		it('should return an object with the offset properties x/y', function() {			
			
			expect(get.offset(h2).left).toBeNumber();
			expect(get.offset(h2).top).toBeNumber();
			
		});
		
		// Spec
		it('should return the value "Array"', function() {			
			
			var myarray = ['a', 'b', 'c'];
			expect(myarray).toBeArray();
			
		});
		
	});

});