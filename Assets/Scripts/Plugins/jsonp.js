define(function(){
	
	function loadScript(url, callback) {
		var d = document,
			b = d.body,
			callback = (typeof callback !== "undefined") ? callback : function(){},
			script = d.createElement("script");
			script.type = "text/javascript";
	
		if (script.readyState) { // Internet Explorer
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					/*
					 * Oddly the final readyState isn’t always "complete". 
					 * Sometimes, readyState stops at "loaded" without going on to "complete" 
					 * and sometimes it skips over "loaded" altogether. 
					 * 
					 * The best approach is to check for both readyState values 
					 * and remove the event handler in both cases to ensure you don’t handle the loading twice:
					 */
					script.onreadystatechange = null;
					callback(true);
				}
			};
		} else {
			script.onload = function() {
				callback(true);
			};
		}
	
		script.src = url;
		b.insertBefore(script, b.firstChild); // can be a problem if the BODY doesn't exist
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
				// Create global variable for jsonp service to execute
		        window['rjs_global'] = function(data) {
		            // Create global variable to store returned data
		            window['rjs_jsonp'] = data;
		        };
	        
				loadScript(resource, function(loaded){
					if (loaded && ('rjs_jsonp' in window)) {
						load(window['rjs_jsonp']);
					}
				});
			}
		}
	};
	
});