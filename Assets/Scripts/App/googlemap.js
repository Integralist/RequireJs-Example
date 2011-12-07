define(['require', 'jquery', 'underscore'], function(require, $, _) {

    /*
     * NOTES:
     * 
     * 1. Abstract the google maps API with a wrapper object
	 * 2. Create a single $.Deferred() object
	 * 3. Queue up calls on the maps API by wrapping the code inside done()
	 * 	  We have to use Function#bind to make sure the context of 'this' is correct.
	 * 	  To keep 'this' pointing to the GoogleMaps instance, we employ _.bind() which is underscorejs' implementation of ES5 bind() method.
	 * 4. Use the async loading option of google maps api with a callback
	 * 5. In the maps callback, call resolve() on the deferred object
     */
    
    var _mapsLoaded = $.Deferred();

    var GoogleMaps = (function () {
        function GoogleMaps() {
            _mapsLoaded.done(_.bind(function() {
                this.init();
            }, this));
        }

        GoogleMaps.prototype.init = function() {
            this._geocoder = new google.maps.Geocoder;
            this._marker = new google.maps.Marker;
        };

        GoogleMaps.prototype.createMap = function(container) {
            _mapsLoaded.done(_.bind(function() {
                var options = {
                    zoom: 8,
                    disableDefaultUI: true,
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    overviewMapControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: new google.maps.LatLng(40.697488, -73.97968100000003)
                };
                this._gmap = new google.maps.Map(container, options);

            }, this));
        };

        GoogleMaps.prototype.search = function(searchText) {
            _mapsLoaded.done(_.bind(function() {
                var mapInstance = this;
                this._geocoder.geocode({address: searchText }, function(results, status) {
                    if (results.length <= 0) return;

                    var geom = results[0].geometry,
                        location = geom.bounds.getCenter(),
                        address = results[0].formatted_address,
                        bounds = geom.bounds,
                        viewport = geom.viewport;

                    var markerOptions = {
                        position:  location,
                        title:     address,
                        animation: google.maps.Animation.DROP
                    };

                    mapInstance.placeMarker(markerOptions);
                    mapInstance._gmap.fitBounds(viewport);
                });
            }, this));
        };

        GoogleMaps.prototype.placeMarker = function(options) {
            _mapsLoaded.done(_.bind(function() {
                options.map = this._gmap;
                this._marker.setOptions(options);
            }, this));
        };

        return GoogleMaps;
    })();

    window.gmapsLoaded = function() {
        delete window.gmapsLoaded;
        _mapsLoaded.resolve();
    };

	// We use the timeout to similate latency
    window.setTimeout(function(){
        require(['http://maps.googleapis.com/maps/api/js?sensor=true&callback=gmapsLoaded']);
    }, 5000);

    return GoogleMaps;
    
});