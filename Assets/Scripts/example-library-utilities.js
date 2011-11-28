require(['Utils/elementSiblings', 'Utils/truncate'], function(es, truncate) {
	
	console.log(es.prevElementSibling(document.body));
	console.log(es.nextElementSibling(document.getElementsByTagName('head')[0]));	
	console.log(truncate('my very long string that probably should be truncated'));
	
});