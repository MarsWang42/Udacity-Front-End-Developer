 "use strict";

function startApp() {

    // A great map style presented by Simon Goellner.
    // https://snazzymaps.com/style/134/light-dream
    var mapStyles = [
    {
        "featureType":"landscape",
        "stylers":[
            {
                "hue":"#FFBB00"
            },
            {
                "saturation":43.400000000000006
            },
            {
                "lightness":37.599999999999994
            },
            {
                "gamma":1
            }
        ]
    },
    {
        "featureType":"road.highway",
        "stylers":[
            {
                "hue":"#FFC200"
            },
            {
                "saturation":-61.8
            },
            {
                "lightness":45.599999999999994
            },
            {
                "gamma":1
            }
        ]
    },
    {
        "featureType":"road.arterial",
        "stylers":[
            {
                "hue":"#FF0300"
            },
            {
                "saturation":-100
            },
            {
                "lightness":51.19999999999999
            },
            {
                "gamma":1
            }
        ]
    },
    {
        "featureType":"road.local",
        "stylers":[
            {
                "hue":"#FF0300"
            },
            {
                "saturation":-100
            },
            {
                "lightness":52
            },
            {
                "gamma":1
            }
        ]
    },
    {
        "featureType":"water",
        "stylers":[
            {
                "hue":"#0078FF"
            },
            {
                "saturation":-13.200000000000003
            },
            {
                "lightness":2.4000000000000057
            },
            {
                "gamma":1
            }
        ]
    },
    {
        "featureType":"poi",
        "stylers":[
            {
                "hue":"#00FF6A"
            },
            {
                "saturation":-1.0989010989011234
            },
            {
                "lightness":11.200000000000017
            },
            {
                "gamma":1
            }
        ]
    }
    ];

    var map;

    // Create a null polygon to ensure polygon is defined.
    var polygon = null;

    // Create the info window, which will be used to show such place's
    // detail view.
    var infoWindow = new google.maps.InfoWindow();

    // Define the place constructor.
    function InterestedPlace(place) {
        var _this = this;
        var coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        _this.title = place.name;
        _this.address = place.formatted_address;

        var icon = {
            url: place.icon,
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        _this.marker = new google.maps.Marker({
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id,
            animation: google.maps.Animation.DROP
        });

        _this.marker.addListener('click', function() {
            _this.populateInfoWindow();
        });

        _this.getPlaceWeather(coordinates);
    }

    InterestedPlace.prototype.getPlaceWeather = function(coordinates) {
        var _this = this;
        var url = 'http://api.openweathermap.org/data/2.5/find?lat='+ coordinates.lat +
            '&lon=' + coordinates.lng + '&units=metric&APPID=MyKey';
        $.ajax({
            url: url,
            method: "GET"
        }).done(function(data) {
            _this.weather = {
                main: data.list[0].main,
                weather: data.list[0].weather[0]
            };
        }).fail(function(error){
            _this.weather = {
                error: error.responseJSON.message
            }
        })
    };

    InterestedPlace.prototype.populateInfoWindow = function() {
        var _this = this;
        // If the marker is not bouncing, let it bounce.
        if (_this.marker.getAnimation() !== null) {
            _this.marker.setAnimation(null);
        } else {
            _this.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        // Loop over all other places marker and reset their animation.
        var interestedPlaces = neighborhoodMapViewModel.interestedPlaces();
        for (var i = 0, len = interestedPlaces.length; i < len; i++) {
            if (interestedPlaces[i].marker !== _this.marker) {
                interestedPlaces[i].marker.setAnimation(null);
            }
        }
        // Deal with the info window.
        if(infoWindow.marker != _this.marker) {
            // Reset the info window.
            infoWindow.setContent('');
            infoWindow.marker = _this.marker;
            infoWindow.addListener('closeclick', function() {
                infoWindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            streetViewService.getPanoramaByLocation(_this.marker.position, radius, getStreetView);
        }

        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
            var htmlContent = '';
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, _this.marker.position);
                // set the content of the info window
                if (_this.weather.error === undefined) {
                    htmlContent = '<h4>' + _this.marker.title + '</h4>' +
                        '<div class="row">' +
                        '<div class="col-md-6" id="pano"></div>' +
                        '<div class="col-md-6">' +
                        '<div>Weather: ' + _this.weather.weather.main + '</div>' +
                        '<div>Average Temperature: ' + _this.weather.main.temp + '</div>' +
                        '<div>Highest Temperature: ' + _this.weather.main.temp_max + '</div>' +
                        '<div>Lowest Temperature: ' + _this.weather.main.temp_min + '</div>' +
                        '</div></div>';
                } else {
                    htmlContent = '<h4>' + _this.marker.title + '</h4>' +
                        '<div class="row">' +
                        '<div class="col-md-6" id="pano"></div>' +
                        '<div class="col-md-6">' +
                        '<div class="error-message">Weather Error: ' + _this.weather.error + '</div>' +
                        '</div></div>';
                }
                infoWindow.setContent(htmlContent);

                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch:30
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), panoramaOptions);
            } else {
                var htmlContent = '<h4>' + _this.marker.title + '</h4>' +
                    '<div>No Street View Found</div><br>' +
                    '<div>Average Temperature: ' + _this.weather.temp + '</div>' +
                    '<div>Highest Temperature: ' + _this.weather.temp_max + '</div>' +
                    '<div>Lowest Temperature: ' + _this.weather.temp_min + '</div>';
                infoWindow.setContent(htmlContent);
            }
        }
        // Show the infoWindow and posit the marker in the center of the map
        infoWindow.open(map, _this.marker);
        map.panTo(_this.marker.position);
    };


    // Create the view model of knockout.
    function NeighborhoodMapViewModel() {
        var _this = this;

        _this.interestedPlaces = ko.observableArray([]);
        _this.filter = ko.observable();
        _this.areaSearch = ko.observable('Irvine');
        _this.placesSearch = ko.observable('pizza');

        _this.filteredInterestedPlaces = ko.computed(function() {
            if(!_this.filter()){
                return _this.interestedPlaces();
            } else {
                return ko.utils.arrayFilter(_this.interestedPlaces(), function(place) {
                    place = place.title.toLowerCase();
                    return place.includes(_this.filter().toLowerCase());
                });
            }
        });
    }

    NeighborhoodMapViewModel.prototype.showListing = function() {
        var _this = this;
        var places = _this.filteredInterestedPlaces();
        // If the filtered list is empty, don't do anything.
        if(places.length === 0) return;
        // Show all the markers and change the bound.
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, len = places.length; i < len; i++) {
            places[i].marker.setMap(map);
            bounds.extend(places[i].marker.position);
        }
        map.fitBounds(bounds);
    }

    NeighborhoodMapViewModel.prototype.hideListing = function() {
        var _this = this;
        // Hide all the markers.
        for (var i = 0, len = _this.interestedPlaces().length; i < len; i++) {
            _this.interestedPlaces()[i].marker.setMap(null);
        }
    }


    NeighborhoodMapViewModel.prototype.toggleListings = function() {
        var _this = this;
        // Check the place is hidden or not, if it is hidden, show the markers; if not,
        // hide the markers.
        // Jquery here is only for animation use.
        var isListHidden = $('#place-list').is(":hidden");
        if (isListHidden) _this.showListing();
        else _this.hideListing();
    }

    // Zoom to the selected area.
    NeighborhoodMapViewModel.prototype.zoomToArea = function() {
        var _this = this;
        var geocoder = new google.maps.Geocoder();

        // If user didn't input any address, show an alert.
        // Otherwise, zoom to the selected area.
        if (_this.areaSearch === '') {
            window.alert('Please enter an area or address.');
        } else {
            geocoder.geocode({
                address: _this.areaSearch(),
                // The place should be limited in California.
                componentRestrictions: {locality: 'California'}
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);
                } else {
                    window.alert('This area cannot be found.');
                }
            });
        }
    }

    NeighborhoodMapViewModel.prototype.searchNearbyPlaces = function() {
        var _this = this;
        var bounds = new google.maps.LatLngBounds();
        bounds = map.getBounds();
        _this.hideListing();
        var placeService = new google.maps.places.PlacesService(map);
        placeService.textSearch({
            query: _this.placesSearch(),
            bounds: bounds
        }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                _this.createMarkersForPlaces(results);
            } else{
                console.log('Failed to find any place.');
            }
        });
    }

    NeighborhoodMapViewModel.prototype.createMarkersForPlaces = function(places) {
        var _this = this;

        var bounds = new google.maps.LatLngBounds();
        _this.interestedPlaces.removeAll();
        for (var i = 0, len = places.length; i < len; i++) {
            var place = places[i];
            _this.interestedPlaces.push(new InterestedPlace(place));
        }

        // Show the place list and the markers.
        // Jquery is only used for animation.
        $('#place-list').collapse('show');
        _this.showListing();
    }

    // Now bind the ViewModel to our View.
    var neighborhoodMapViewModel = new NeighborhoodMapViewModel();

    neighborhoodMapViewModel.filteredInterestedPlaces.subscribe(function(newValue) {
        neighborhoodMapViewModel.hideListing(); neighborhoodMapViewModel.showListing();
    });

    ko.applyBindings(neighborhoodMapViewModel);

    // Initialize the map.
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 33.672392, lng: -117.834596},
            zoom: 13,
            styles: mapStyles,
            mapTypeControl: false
        });

        var searchBox = new google.maps.places.SearchBox(
            document.getElementById('place-search'));

        searchBox.setBounds(map.getBounds());

        var searchArea = new google.maps.places.Autocomplete(
            document.getElementById('area-search'));

        // For the first time bound is fixed, search the nearby bars.
        google.maps.event.addListenerOnce(map, 'bounds_changed',
            neighborhoodMapViewModel.searchNearbyPlaces.bind(neighborhoodMapViewModel));
    }

    initMap();

}
