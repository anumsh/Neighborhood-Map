var map,
showMapMessage = ko.observable(false);
//loads the google maps API
function initMap() {

    // Create a map
    var mapOptions =  {
        center: {lat: 37.338208, lng: -121.886329},
        zoom: 11,
        scrollwheel: false,
        styles: [
    {
        "stylers": [
            {
                "saturation": -100
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": 50
            },
            {
                "gamma": 0
            },
            {
                "hue": "#50a5d1"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#333333"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": 0.5
            },
            {
                "color": "#333333"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [
            {
                "gamma": 1
            },
            {
                "saturation": 50
            }
        ]
    }
]
    };

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, mapOptions);

    ko.applyBindings(new viewModel());
}

//google map error message
function googleError() {
    showMapMessage(true);
}


//Model

var Locations = [
	{
		name: 'Swaad Indian Cuisine',
		lat: 37.350680,
		lng: -121.884255
	},
	{

		name: 'Spice N Flavor',
		lat: 37.365702,
		lng: -121.851522
	},
	{

		name: 'Kettle’e',
		lat: 37.352009,
		lng: -121.954643
	},
	{
		name: 'Curry Roots',
		lat: 37.251468,
		lng: -121.862208
	},
	{
		name: 'Aachi Aappakadai',
		lat: 37.373327,
		lng: -122.052293
	},
	{
		name: 'Naan-N-Masala',
		lat:37.433154,
		lng: -121.885675
	},
	{
		name: "Red Chillies",
		lat: 37.428162,
		lng: -121.906481
	},
	{
		name: 'Amber India',
		lat: 37.319356,
		lng: -121.948621
	},
	{
		name: "Darbar Indian Cuisine",
		lat: 37.444829,
		lng: -122.165101
	}
];

// javascript constructor

var Restaurant = function(data) {
    var self = this;
    self.name = ko.observable(data.name);
    self.lat = ko.observable(data.lat);
    self.lng = ko.observable(data.lng);
    self.marker = ko.observable();
    self.address = ko.observable('');
    self.contentString = ko.observable('');

};

//viewModel
var viewModel = function() {

    var self = this;

		var infowindow = new google.maps.InfoWindow({maxWidth:200}),
        image = 'images/icon.png',
        location,
        marker;

    self.restaurants = ko.observableArray([]); // array of restaurants
    //call the constructor
    Locations.forEach(function(restaurantItem){
        self.restaurants.push(new Restaurant(restaurantItem));
    });

    //set markers
    self.restaurants().forEach(function(restaurantItem){

        //define markers
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(restaurantItem.lat(), restaurantItem.lng()),
            map: map,
            icon: image,
            animation: google.maps.Animation.DROP
        });
        restaurantItem.marker = marker;

				// Content of the infowindow
restaurantItem.contentString = '<div"><h5>' + restaurantItem.name() + '</h5>' +
  '<p>' + restaurantItem.lat() + ',' + restaurantItem.lng() + '>Directions</p></div>';

// Add infowindows
google.maps.event.addListener(restaurantItem.marker, 'click', function () {
		infowindow.open(map, this);
		// Bounce animation
		restaurantItem.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function () {
				restaurantItem.marker.setAnimation(null);
		}, 1400);
		infowindow.setContent(restaurantItem.contentString);
		window.setTimeout(function() {
									 map.panTo(marker.getPosition());
							 }, 3000);

					 });


    // Show the marker when the user clicks the list
    self.showInfo = function (restaurantItem) {
        google.maps.event.trigger(restaurantItem.marker, 'click');
    };


    self.locationList = ko.observableArray(); // location list array

    // push all the resturant data  into locationList
    self.restaurants().forEach(function (resto) {
        self.locationList.push(resto);
    });

    // search box
    self.search = ko.observable('');

    //filter part of locations
    self.filter = ko.computed (function() {
        // Set all markers and places to not visible.
        searchInput = self.search().toLowerCase();
        //close current infowindows when user try to search on box
        infowindow.close();
				if(!searchInput) {
					return self.locationList();
				}
        else {
          // ko.utils.arrayFilter method returns a matching subset of items
            return ko.utils.arrayFilter(self.locationList(), function(resto) {
                return (resto.name().toLowerCase().indexOf(searchInput) != -1);  // match? true else false
        });
        }
      }, this);

      //
			this.resetLoc = function() {
	         self.search("");
	     }
		}
                               );
};
