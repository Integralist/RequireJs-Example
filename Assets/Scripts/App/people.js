define(["Models/Person", "Utils/random"], function (Person, randomUtility) {
	
	// Nothing should be declared outside of a single define call.
	// This code is saved in Assets/Scripts/App/people.js, so this module would be defined as "Assets/Scripts/App/people".
	
	// Notice that our required modules(scripts) don't use the full path /Assets/Scripts/
	// This is because in our main HTML page we've specified the main path already as a data- attribute on the script tag.
	// So RequireJs already knows that when we say 'Models/Person' we mean 'Assets/Scripts/Models/Person'.
	
	var people = [];
	
	people.push(new Person('Jim'));
	people.push(new Person(randomUtility.someValue));
  
	return { list: people };
	
});