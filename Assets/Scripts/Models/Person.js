define(function() {
	
	// Nothing should be declared outside of a single define call.
	// This code is saved in Assets/Scripts/Models/Person.js, so this module would be defined as "Assets/Scripts/Models/Person".
	
	// In Classical Inheritance style.
	return function Person(fullname) {
		this.name = fullname;
	}
	
});