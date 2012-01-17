define(['Utils/ajax'], function(ajax){

	// Test Suite (these can have multiple 'Specs' within them)
	describe('AJAX test', function() {
		
		/*
		 * Be aware that code directly inside the describe() function is only executed once.
		 * If you want to initialize variables before each spec, use a beforeEach() function (similar to TDD's setUp).
		 * You can also run code after each spec using the afterEach() function (similar to TDD's tearDown)
		 */
		
		// Spec
		/*
		it('Grabs data and returns a json object', function() {			
			
			var data = false,
				response;
				
			function checkAsyncResult() {
				return data;
			}
			
			ajax({
				url: 'JSON.php',
				dataType: 'json',			
				onSuccess: function(resp) {
					// resp = {"a":1,"b":2,"c":3,"d":4,"e":5}
					data = true; // we return true so our unit test knows this function succeeded
					response = resp;
				}
			});
			
			// This is a 'block' function.
			// Other 'Block' functions are runs() and waits()
			waitsFor(function() {
				return checkAsyncResult();
			}, "It took too long to grab that data.", 3000);
			
			runs(function(){
				//Expectations expect() and Matchers .toBe()
				expect(data).toBeTruthy();
				expect(response.a).toEqual(1);
			});
		});
		*/
		
		/*
		 * THE FOLLOWING SPEC IS USING SINON.JS TO FAKE THE XHR REQUEST
		 * THIS SAVES ON SERVER RESOURCES WHEN RUNNING LARGE TEST SUITES
		 */
		
		beforeEach(function() {
			this.addMatchers({
				toBeNumber: function(expected) {
					return /\d+/.test(this.actual);
				}
			});
			
			// Sinon.js code follows…			
			this.myAjax = sinon.useFakeXMLHttpRequest();			
	        var requests = this.requests = [];	
			this.myAjax.onCreate = function (xhr) {
	            requests.push(xhr);
	        };
  		});
  		
  		afterEach(function() {
    		// Sinon.js code follows…
    		this.myAjax.restore();
  		});
  		
		it('Grabs data and returns a json object', function(){
			
			var callback = sinon.spy();
			
			ajax({
				url: 'JSON.php',
				dataType: 'json',			
				onSuccess: callback
			});
			
			this.requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "id": 12, "comment": "Hey there" }]');
			
			expect(this.requests.length).toBeNumber();
			expect(this.requests.length).toBe(1);
			expect(callback.calledWith([{ id: 12, comment: "Hey there" }])).toBeTruthy();
			
		});
		
	});

});