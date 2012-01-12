require.config({
	catchError: {
		define: true
	}
});
  
require(['errorhandler'], function(handler) {
	console.log('error handler loaded');
	require.onError = handler;
});

require(['module-with-dependancy-issue'], function(mod) {
	console.log(mod);
});