define(function(){
	
	var DEFAULT_PARAM_NAME = 'callback',
        _uid = 0;
	
	function loadScript(url) {
		var d = document,
			b = d.body,
			s = d.getElementsByTagName('script')[0], // first script tag found in page (there will ALWAYS be a script tag in the page - otherwise this script wouldn't have run!)
			script = d.createElement("script");
			script.type = "text/javascript";
	
		script.src = url;
		s.parentNode.insertBefore(script, s);
	}
	
	// This works around issue with some services where they use a different 'default' callback
	// e.g. flickr uses 'jsoncallback' rather than 'callback' (most services use 'callback' as standard)
	function formatUrl(name, id){
        var paramRegex = /!(.+)/,
            url = name.replace(paramRegex, ''),
            param = (paramRegex.test(name))? name.replace(/.+!/, '') : DEFAULT_PARAM_NAME;
        url += (url.indexOf('?') < 0)? '?' : '&';
        return url + param +'='+ id;
    }

	// We need to store each of the RequireJs 'load' callbacks for multiple resources in global variables (bad I know, but essential in this scenario)
	// So the global vars need to be unique so this function does just that.
    function uid() {
        _uid += 1;
        return '__jsonp_'+ _uid +'__';
    }
	
	return {
		/**
		 * @param resource { String } the resource to be loaded
		 * @param req { Function } a local require() for loading other modules
		 * @param load { Function } a function to call with the value for name (this tells the loader that the plugin is done loading the resource)
		 * @param config { Object } the main configuration object RequireJs is using
		 */
		load: function(resource, req, load, config) {
			/*
	         * NOTE: I originally had set window['rjs_global'] and window['rjs_jsonp'] outside of the returned object literal
	         * But when running the build script, there was no access to a 'window' object so nodejs choked and stopped the build.
	         *
	         * Looking at @millermedeiros' async plugin https://github.com/millermedeiros/requirejs-plugins/blob/master/src/async.js
	         * I noticed he had his 'window' reference inside the returned 'load' method and was also using a check for config.isBuild
	         *
	         * Documentation notes:
	         * The optimizer will set an isBuild property in the config to true if this plugin (or pluginBuilder) 
	         * is being called as part of an optimizer build
	         */
			if (config.isBuild) {
				load(null);
			} else {
				var id = uid(); // Generate unique id value
                window[id] = load; // Create a unique global variable that stores the 'load' callback function ('load' executes once the current resource is loaded)
                console.log('formatUrl(resource, id)', formatUrl(resource, id));
                loadScript(formatUrl(resource, id)); // Insert the script into the page (but notice the url is now formatted so the callback method is consistent with it's relevant API) and the callback executes the unique global var that holds its associated 'load' function
			}
		}
	};
	
});