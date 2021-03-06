require(['Utils/truncate', 'Utils/isIE', 'Utils/isHost', 'Utils/ajax', 'Utils/events', 'Utils/toCamelCase', 'Utils/toHyphens', 'Utils/get', 'Utils/Dictionary', 'Utils/css', 'Utils/dom'], function(truncate, isIE, isHost, ajax, events, toCamelCase, toHyphens, get, Dictionary, css, dom) {
	
	console.log('truncate', truncate('my very long string that probably should be truncated'));
	console.log('isIE', isIE);
	console.log('isHost.method(document, \'appendChild\')', isHost.method(document, 'appendChild'));
	console.log('isHost.method(document, \'attachEvent\')', isHost.method(document, 'attachEvent'));
	console.log('isHost.collection(document.getElementsByTagName(\'h2\'), \'item\')', isHost.collection(document.getElementsByTagName('h2'), 'item'));
	console.log('isHost.collection(document.getElementsByTagName(\'h2\'), \'namedItem\')', isHost.collection(document.getElementsByTagName('h2'), 'namedItem'));
	console.log('isHost.object(document, \'appendChild\')', isHost.object(document, 'appendChild'), '…false; because this is a method NOT an object/property');
	console.log('isHost.object(document, \'body\')', isHost.object(document, 'body'));
	
	ajax({
		url: 'JSON.php',
		dataType: 'json',			
		onSuccess: function(resp) {
			// {"a":1,"b":2,"c":3,"d":4,"e":5}
			console.log('ajax', resp['a'], resp['b'], resp['c'], resp['d'], resp['e']);
		}
	});
	
	ajax({
		url: 'Assets/Scripts/Require.js',

		onError: function(message) {
			console.log('ajax', 'ERROR!\n\n' + message + '\n');
		},
		
		onSuccess: function(response) {
			console.log('ajax', response.substring(0, 20) + '... this is a shortened response');
		},
	
		onComplete: function() {
			console.log('ajax', 'This will run regardless of whether the request was successful or not');
		}
	});
	
	// Event Handling
	function headerHandler(e) {
		console.log('headerHandler');
		events.remove(header, 'click', headerHandler);
	}
	function linkHandler(e) {
		console.log('type: ', e.type);
		console.log('target: ', e.target, e.target.style.border='1px solid red'); // element which triggered the event
		console.log('relatedTarget: ', e.relatedTarget); // undefined unless a mouse over/out event
		console.log('stopPropagation: ', e.stopPropagation()); // prevents click event on containing <h1> to be triggered
		console.log('preventDefault: ', e.preventDefault()); // prevents the <a> from directing to specified href
		events.remove(link, 'click', linkHandler);
	}	
	var header = document.getElementsByTagName('h1')[0],
		link = header.getElementsByTagName('a')[0];
	header.style.cursor = 'pointer';
	events.add(header, 'click', headerHandler);
	events.add(link, 'click', linkHandler);	
	
	// toCamelCase and toHyphens
	console.log('toCamelCase', toCamelCase('this-is-my-hyphenated-string'));
	console.log('toHyphens', toHyphens('thisIsMyCamelCaseString'));
	
	// get methods
	console.log('get.el', get.el('mytest'));
	console.log('get.tag', get.tag({ tag:'h2' }));
	console.log('get.tag/first', get.tag({ tag:'h2', first:true }));
	console.log('get.docheight', get.docheight());
	console.log('get.offset', get.offset(h2));
	console.log('get.type', get.type(['a', 'b', 'c']));
	
	// DOM
	var para = get.el('para'),
		iah = get.el('iah');
	console.log(para);
	console.log(iah);
	para.outerHTML = '<div>This div replaced a paragraph via outerHTML (innerHTML would have added this div INSIDE of the element it was called on, where outerHTML works on the actual element rather than adding inside of it)</div>';
	iah.insertAdjacentHTML('beforebegin', '<strong style="color:red;">beforebegin (this is outside the p tag)</strong>');
	iah.insertAdjacentHTML('afterbegin', '<strong style="color:red;">afterbegin (this is inside the p tag)</strong>');
	iah.insertAdjacentHTML('beforeend', '<strong style="color:red;">beforeend (this is inside the p tag)</strong>');
	iah.insertAdjacentHTML('afterend', '<strong style="color:red;">afterend (this is outside the p tag)</strong>');
	// <!-- beforebegin --><p><!-- afterbegin -->foo<!-- beforeend --></p><!-- afterend -->
	console.log('prevElementSibling', dom.elementSiblings.prevElementSibling(document.body));
	console.log('nextElementSibling', dom.elementSiblings.nextElementSibling(document.getElementsByTagName('head')[0]));
	// insertAfter
	var h2 = document.createElement('h2'),
		h2txt = document.createTextNode('insertAfter test');	
	h2.appendChild(h2txt);
	h2.className = 'class-a class-b class-c'
	dom.insertAfter(h2, header);
	
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
	
	colours.store('white', '#FFFFFF'); // Add a new property to this object
	console.log('Dictionary Lookup: ', colours.lookup('white'));	
	console.log('Dictionary Lookup: ', colours.lookup('red')); // Lookup the value for a specific property in this object
	console.log('Dictionary Contains orange: ', colours.contains('orange')); // Does the object contain a property called 'orange'? (case sensitive search)
	console.log('Dictionary Contains Orange: ', colours.contains('Orange')); // Does the object contain a property called 'Orange'? (case sensitive search)
	colours.each(function(name, val) {
		console.log('Dictionary Each: ', name + ' is ' + val); // Do something for each property in this object
	});	
	console.log('Dictionary Names: ', colours.names()); // List all properties within this object
	
	// CSS
	console.log('css.style(h2, "height")', css.style(h2, 'height'));
	console.log('css.classes(h2)', css.classes(h2));
	css.add(h2, 'new-class');
	console.log('css.add(h2, "new-class")', h2);
	css.remove(h2, 'class-a');
	console.log('css.remove(h2, "class-a")', h2);
	console.log('css.has(h2, "class-c")', h2, css.has(h2, 'class-c'));
	
});