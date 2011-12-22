require(['Tests/test-ajax', 'Tests/test-css', 'Tests/test-dictionary', 'Tests/test-get', 'Tests/test-events'], function(){

	jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
	jasmine.getEnv().execute();

});