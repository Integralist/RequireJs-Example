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
	
	// Create global variable for jsonp service to execute
	window['rjs_global'] = function(data) {
		// Create global variable to store returned data
		window['rjs_jsonp'] = data;
	};
	
	return {
		/**
		 * @param resource { String } the resource to be loaded
		 * @param req { Function } a local require() for loading other modules
		 * @param load { Function } a function to call with the value for name (this tells the loader that the plugin is done loading the resource)
		 * @param config { Object } the main configuration object RequireJs is using
		 */
		load: function(resource, req, load, config) {
			loadScript(resource, function(loaded){
				if (loaded && ('rjs_jsonp' in window)) {
					load(window['rjs_jsonp']);
				}
			});
		}
	};
	
});