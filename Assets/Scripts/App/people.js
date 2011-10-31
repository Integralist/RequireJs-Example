/*
 * You see we've specified the jQuery library as a dependency without specifying its correct path (we've just specified the name 'jquery').
 * This is because jQuery's AMD support is based on it being defined as a 'Named Module'.
 * So if you look at the script main.js (which is our bootstrapper file) you'll see we've set the require.config() to include the full path to jQuery.
 */
define(['Models/Person', 'Utils/random', 'jquery'], function (Person, randomUtility, $) {
	
	// Nothing should be declared outside of a single define call.
	// This code is saved in Assets/Scripts/App/people.js, so this module would be defined as "Assets/Scripts/App/people".
	
	// Notice that our required modules(scripts) don't use the full path /Assets/Scripts/
	// This is because in our main HTML page we've specified the main path already as a data- attribute on the script tag.
	// So RequireJs already knows that when we say 'Models/Person' we mean 'Assets/Scripts/Models/Person'.
	
	var people = [],
		scriptsOnPage = $('script');
	
	people.push(new Person('Jim'));
	people.push(new Person(randomUtility.someValue));
  
	return { list: people, scripts: scriptsOnPage };
	
});