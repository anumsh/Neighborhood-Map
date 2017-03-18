// declare global variables
var map,
showMapMessage = ko.observable(false);

// 1. loads the google map
function initMap() {

    // Create a map
    var mapOptions =  {
        center: {lat: 37.338208, lng: -121.886329},
        zoom: 11,
        scrollwheel: false,
        styles: [
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#747474"
            },
            {
                "lightness": "23"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f38eb0"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ced7db"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffa5a8"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c7e5c8"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d6cbc7"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c4c9e8"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b1eaf1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffd4a5"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe9d2"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "3.00"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "0.30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#747474"
            },
            {
                "lightness": "36"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#e9e5dc"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#d2e7f7"
            }
        ]
    }
]
    };

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, mapOptions);

    ko.applyBindings(new viewModel()); // activate knockout
}

//google map error message ????????????/   not working ????????????
function googleError() {
  console.log("google errror");
  alert("google map not loaded");
    showMapMessage(true);

}

// 2. Model

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

// 3. javascript constructor

var Restaurant = function(data) {
    var self = this;
    self.name = ko.observable(data.name);
    self.lat = ko.observable(data.lat);
    self.lng = ko.observable(data.lng);
    self.marker = ko.observable();
    self.contentString = ko.observable('');

};

// 4. ViewModel
var viewModel = function() {
    var self = this;
		var infowindow = new google.maps.InfoWindow({maxWidth:200}), // define infowindow
        image = 'images/icon.png'; // marker image
    self.restaurants = ko.observableArray([]); // array of restaurants
    //call the constructor
    Locations.forEach(function(restaurantItem){
        self.restaurants.push(new Restaurant(restaurantItem));
    });

    // 5. set markers
    self.restaurants().forEach(function(restaurantItem){

    //define markers
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(restaurantItem.lat(), restaurantItem.lng()),
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP
    });
    restaurantItem.marker = marker;
    //console.log(restaurantItem.marker);

  // 6.1 Content of the infowindow
    restaurantItem.contentString = '<div><h5>' + restaurantItem.name() + '</h5>'
                      + '<div><p>' +
                      restaurantItem.lat() + ',' + restaurantItem.lng() + '>Directions</a></p></div>';

      // 6.2 Add infowindows
              google.maps.event.addListener(restaurantItem.marker, 'click', function () {
                infowindow.setContent(restaurantItem.contentString);
                infowindow.open(map, restaurantItem.marker);
                restaurantItem.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    restaurantItem.marker.setAnimation(null);
                }, 1400);
              });

    // 7. Show the marker when the user clicks the list
    self.showInfo = function (restaurantItem) {
        google.maps.event.trigger(restaurantItem.marker, 'click');
    };
    // 8.LocationLists Observable Array
    self.locationList = ko.observableArray();
    // push all the restaurant data  into locationList
    self.restaurants().forEach(function (resto) {
        self.locationList.push(resto);
    });

    // 9. Visible Observable Array containing markers based on search
    self.visible = ko.observableArray();

    // All markers are visible by default
    self.locationList().forEach(function (resto) {
        self.visible.push(resto);
    });
    // 10. search observable
    self.search = ko.observable('');

    // 11. Filtering the restarant locations
    self.filter = function() {
        searchInput = self.search().toLowerCase();
        //close current infowindows when user try to search on box
        infowindow.close();
        self.visible.removeAll();
        self.locationList().forEach(function (resto) {
           resto.marker.setVisible(false);
               // If user input is included in the name, set marker as visible
               if (resto.name().toLowerCase().indexOf(searchInput) !== -1) {
               self.visible.push(resto);
           }
       });
       self.visible().forEach(function (resto) {
           resto.marker.setVisible(true);
       });
     }; //filter close
  }); //locationlist close
}; // view model close
