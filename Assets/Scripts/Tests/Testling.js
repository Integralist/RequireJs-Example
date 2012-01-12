// Create account with http://browserling.com/
// Run tests via http://testling.com/
//
// Documentation: http://testling.com/docs/
//
// Execute test via Terminal: 
// 		curl -u mark@stormcreative.co.uk:stormy -sSNT Testling.js testling.com/?browsers=iexplore/6.0,firefox,safari
//
// With a free account you get 200 minutes per month.
// To check your usage:
// 		curl -u me@example.com -s testling.com/usage

var test = require('testling'),
	css = require('../Utils/Dictionary');

test('Dictionary tests', function (t) {
    // See all test assertions here: 
    // http://testling.com/docs/#test-assertions
    
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
	
	colours.store('white', '#FFFFFF');
	t.equal(colours.lookup('white'), '#FFFFFF', 'should add a new "white" property');
	
	t.equal(colours.lookup('red'), '#FF0000', 'should find the specified colour and return its value');
	
	t.ok(colours.contains('orange'), 'should return true');
	
	t.notOk(colours.contains('Orange'), 'should return false');
	
	t.ok(colours.names(), 'should return an Array of property');
    
    t.end();
});