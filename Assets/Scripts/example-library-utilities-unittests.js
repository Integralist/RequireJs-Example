require(['Tests/test-ajax', 'Tests/test-css', 'Tests/test-dictionary', 'Tests/test-get'], function(){

	jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
	jasmine.getEnv().execute();

});