require.config({ 
	paths: {
		morpheus: 'Utils/morpheus',
		sizzle: 'Utils/sizzle',
		when: 'Utils/when',
		pubsubz: 'Utils/pubsubz'
	} 
});

require(['morpheus', 'sizzle', 'when', 'pubsubz'], function(morpheus, find, when, ps) {
	
	var ex1 = getElement('ex1'),
		ex1go = getElement('go-ex1'),
		ex2 = getElement('ex2'),
		ex2go = getElement('go-ex2'),
		ex3 = getElement('ex3'),
		ex3go = getElement('go-ex3'),
		ex4 = getElement('ex4'),
		ex4go = getElement('go-ex4'),
		ex5 = getElement('ex5'),
		ex5go = getElement('go-ex5'),
		ex6 = getElement('ex6'),
		ex6go = getElement('go-ex6'),
		ex7 = getElement('ex7'),
		containerWhen = getElement('when'),
		containerPubsubz = getElement('when');
	
	function getElement(id) {
		return document.getElementById(id);
	}
	
	function rand(n) {
		var poz = [' ', '-'],
			prefix = poz[Math.floor(Math.random() * 2)],
			r = parseInt(prefix + Math.floor(Math.random() * n), 10);
		return r;
	}
	
	// Used by Morpheus Example 7
	var anim = {
		stop: function(){}
	}
	
	// Morpheus Example 1
	ex1go.onclick = function() {
		ex1go.disabled = true;
		ex1.style.left = 0;
		
		morpheus(ex1, {
			left: 400,
			complete: function() {
				ex1go.disabled = false;
			}
		});
	};
	
	// Morpheus Example 2
	ex2go.onclick = function() {
		ex2go.disabled = true;
		ex2.style.left = 0;
		ex2.style.backgroundColor = '#f00';
		ex2.style.width = '20px';
		
		morpheus(ex2, {
			left: 400,
			width: '+=20',
			backgroundColor: '#00f',
			easing: 'bounce',
			complete: function() {
				ex2go.disabled = false;
			}
		});
	};
	
	// Morpheus Example 3
	ex3go.onclick = function() {
		ex3go.disabled = true;
		ex3.style.backgroundColor = '#f00';
		
		morpheus(ex3, {
			backgroundColor: '#00f',
			duration: 2000,
			complete: function() {
				ex3go.disabled = false;
			}
		});
	};
	
	// Morpheus Example 4
	ex4go.onclick = function() {
		ex4go.disabled = true;
		ex4.style.fontSize = '1.2em';
		
		morpheus(ex4, {
			fontSize: '+=3.1em',
			easing: 'spring',
			complete: function() {
				ex4go.disabled = false;
			}
		});
	};
	
	// Morpheus Example 5
	ex5go.onclick = function() {
		ex5go.disabled = true;
		ex5.style.left = 0;
		
		morpheus(ex5, {
			duration: 2000,
			easing: 'easeIn',
			left: 400,
			bezier: [[150, 300], [300, -300]],
			complete: function() {
				ex5go.disabled = false;
			}
		});
	};
	
	// Morpheus Example 6
	ex6go.onclick = function () {
		ex6go.disabled = true;
		var boxes = find('#ex6 .box');
		
		for (var i = 0, len = boxes.length; i < len; i++) {
			boxes[i].style.left = 1;
			boxes[i].style.top = 0;
			boxes[i].style.width = 20;
			boxes[i].style.backgroundColor = '#f00';
		}
		
		morpheus(ex6.getElementsByTagName('div'), {
			duration: 3000,
			easing: 'swingTo',
			left: function() {
				return '+=' + Math.abs(rand(400));
			},
			width: '+=80',
			backgroundColor: function(el) {
				return el.getAttribute('data-to');
			},
			bezier: function(el) {
				return [[rand(300), rand(300)], [rand(300), rand(300)]];
			},
			complete: function() {
				ex6go.disabled = false;
			}
		});
	};
	
	// Morpheus Example 7
	ex7.onclick = function() {
		anim.stop(true);
	};
	
	ex7.onmouseover = function() {
		anim.stop();
		anim = morpheus(ex7, {
			backgroundColor: '#00f',
			width: 400
		});
	};
	
	ex7.onmouseout = function() {
		anim.stop();
		anim = morpheus(ex7, {
			backgroundColor: '#f00',
			width: 100
		});
	};
	
	// When.js Example
	function loadImage (src) {
		var deferred = when.defer(),
			img = document.createElement('img');
		
		img.onload = function () { 
			deferred.resolve(img); 
		};
		
		img.onerror = function () { 
			deferred.reject(new Error('Image not found: ' + src));
		};
		
		img.src = src;
		img.id = 'logo';
	
		// Return only the promise, so that the caller cannot resolve, reject, or otherwise muck with the original deferred
		return deferred.promise;
	}
	
	loadImage('http://google.com/favicon.ico').then(
		function gotIt(img) {
			containerWhen.appendChild(img);
		},
		function doh(err) {
			containerWhen.appendChild(document.createTextNode(err));
		}
	).then(
		function shout(img) {
			console.log('When.js: asynchronous loading of image complete… ' + img.src + '?');
		}
	);
	
	loadImage('blah.jpg').then(
		function gotIt(img) {
			containerWhen.appendChild(img);
		},
		function doh(err) {
			containerWhen.appendChild(document.createTextNode(err));
		}
	).then(
		function shout(img) {
			console.log('When.js: asynchronous loading of image complete… ' + img.src + '?');
		}
	);
	
	// Pubsubz.js Example	
	var app = {	
		init: function() {
			console.log('Pubsubz.js: "init" has been called, now setTimeout for 5 seconds from now to publish an event called "tester"');
			window.setTimeout(function(){
				console.log('5 seconds has passed so trigger custom event "tester"');
				ps.publish('tester', 'some data published!');
			}, 5000);
		}		
	};
	
	function subscriberTest(topic, data) {
		console.log('subscriberTest executed: topic = ', topic, '; data = ', data);
	}
	
	ps.subscribe('tester', subscriberTest); // test() will execute when 'tester' event is triggered
	app.init();
	
});