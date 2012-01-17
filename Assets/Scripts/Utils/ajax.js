define(['Utils/isIE', 'Utils/json'], function(isIE, JSON){

	// Note: wasn't able to require() in the json.js script for browsers that don't support it
	// As it would load asynchronusly and the below callback function would have executed before the json.js was loaded
	// I could have used when.js to handle this situation but seems a bit OTT.
	// I could also of have had one if statement at the top of this module which checked for support and forked there but I didn't like the idea of having all my code in an else statement
	// So decided to just load the script for all users (once it's minified and gzip'ed it shouldn't be much of a performance issue).

	// Used by ajax method to store errors
	var errors = [];
	
	/**
	 * XMLHttpRequest abstraction.
	 * 
	 * @return xhr { XMLHttpRequest|ActiveXObject } a new instance of either the native XMLHttpRequest object or the corresponding ActiveXObject
	 */
 	var __xhr = (function() {

		// Create local variable which will cache the results of this function
		var xhr;
		
		return function() {
			// Check if function has already cached the value
			if (xhr) {
				// Create a new XMLHttpRequest instance
				return new xhr();
			} else {
				// Check what XMLHttpRequest object is available and cache it
				xhr = (!window.XMLHttpRequest) ? function() {
					return new ActiveXObject(
						// Internet Explorer 5 uses a different XMLHTTP object from Internet Explorer 6
						(isIE < 6) ? "Microsoft.XMLHTTP" : "MSXML2.XMLHTTP"
					);
				} : window.XMLHttpRequest;
				
				// Return a new XMLHttpRequest instance
				return new xhr();
			}
		};
		
	}());
	
	/**
	 * A basic AJAX method.
	 * 
	 * @param settings { Object } user configuration
	 * @return undefined {  } no explicitly returned value
	 */
 	var ajax = function(settings) {
 	
 		// JavaScript engine will 'hoist' variables so we'll be specific and declare them here
 		var xhr, url, requestDone, xhrTimeout,  
 		
 		// Load the config object with defaults, if no values were provided by the user
		config = {
			// The type of HTTP Request
			method: settings.method || 'GET',
			
			// The data to POST to the server
			data: settings.data || '',
		
			// The URL the request will be made to
			url: settings.url || '',
		
			// How long to wait before considering the request to be a timeout
			timeout: settings.timeout || 5000,
		
			// Functions to call when the request fails, succeeds, or completes (either fail or succeed)
			onComplete: settings.onComplete || function(){},
			onError: settings.onError || function(){},
			onSuccess: settings.onSuccess || function(){},
		
			// The data type that'll be returned from the server
			// the default is simply to determine what data was returned from the server and act accordingly.
			dataType: settings.dataType || ''
		};
		
		// Create new cross-browser XMLHttpRequest instance
		xhr = __xhr();
		
		// Open the asynchronous request
		xhr.open(config.method, config.url, true);
		
		// Determine the success of the HTTP response
		function httpSuccess(r) {
			try {
				// If no server status is provided, and we're actually
				// requesting a local file, then it was successful
				return !r.status && location.protocol == 'file:' ||
				
				// Any status in the 200 range is good
				( r.status >= 200 && r.status < 300 ) ||
				
				// Successful if the document has not been modified
				r.status == 304 ||
				
				// Safari returns an empty status if the file has not been modified
				navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status == 'undefined';
			} catch(e){
				// Throw a corresponding error
				throw new Error("httpSuccess Error = " + e);
			}
			
			// If checking the status failed, then assume that the request failed too
			return false;
		}
		
		// Extract the correct data from the HTTP response
		function httpData(xhr, type) {
			
			if (type === 'json') {
				return JSON.parse(xhr.responseText);
				//return eval('(' + xhr.responseText + ')');
			}
			
			//
			else if (type === 'html') {
				return xhr.responseText;
			}
			
			//
			else if (type === 'xml') {
				return xhr.responseXML;
			}
			
			// Attempt to work out the content type
			else {
				// Get the content-type header
				var contentType = xhr.getResponseHeader("content-type"), 
					 data = !type && contentType && contentType.indexOf("xml") >= 0; // If no default type was provided, determine if some form of XML was returned from the server
				
				// Get the XML Document object if XML was returned from the server,
				// otherwise return the text contents returned by the server
				data = (type == "xml" || data) ? xhr.responseXML : xhr.responseText;	
				
				// Return the response data (either an XML Document or a text string)
				return data;
			}
			
		}
		
		// Initalize a callback which will fire within the timeout range, also cancelling the request (if it has not already occurred)
		xhrTimeout = window.setTimeout(function() {
			requestDone = true;
			config.onComplete();
		}, config.timeout);
		
		// Watch for when the state of the document gets updated
		xhr.onreadystatechange = function() {
			
			// Wait until the data is fully loaded, and make sure that the request hasn't already timed out
			if (xhr.readyState == 4 && !requestDone) {
				
				// Check to see if the request was successful
				if (httpSuccess(xhr)) {
					// Execute the success callback
					config.onSuccess(httpData(xhr, config.dataType));
				}
				
				/**
				 * For some reason, in an example PHP script that returns JSON data,
				 * even though the request 'timed out' it still generated a readyState of 4.
				 * I believe this was because although the script used sleep() to delay the data returned, the fact it returned data after the timeout caused an error.
				 * So when the httpSuccess expression used in the above condition returns false we need to execute the onError handler.
				 */
				else {
					config.onError(xhr);
				}
	
				// Call the completion callback
				config.onComplete();
				
				// Clean up after ourselves (+ help to avoid memory leaks)
				clearTimeout(xhrTimeout);
				xhr.onreadystatechange = null;
				xhr = null;
				
			} else if (requestDone && xhr.readyState != 4) {
				// If the script timed out then keep a log of it so the developer can query this and handle any exceptions
				errors.push(url + " { timed out } ");
				
				// Bail out of the request immediately
				xhr.onreadystatechange = null;
				xhr = null;
			}
			
		};
		
		// Get if we should POST or GET...
		if (config.data && config.method === 'POST') {
			// Settings
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			
			// Establish the connection to the server
			xhr.send(config.data);
		} else {
			// Establish the connection to the server
			xhr.send(null);
		}

	}

	return ajax;

});