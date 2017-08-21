// tutorial1 basic setup

var mapContainer = document.getElementById('map-container');

var platform = new H.service.Platform({
  app_id: '82Rr651K5ESuat9mVcUW', // // <-- ENTER YOUR APP ID HERE
  app_code: 'iNN2uYP8SzZZj_nDsOk6AQ', // <-- ENTER YOUR APP CODE HERE
  // Only necessary if served over HTTPS:
  useHTTPS: true
});

var HEREHQcoordinates = {
  // HERE HQ in Berlin, Germany:
  lat: 52.530974,
  lng: 13.384944
};

var routeRendered = false; //tutorial3

// Displaying the map
var mapOptions = {
  center: HEREHQcoordinates,
  zoom: 14
};

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
  mapContainer,
  defaultLayers.normal.map,
  mapOptions);

// Resize the map when the window is resized
window.addEventListener('resize', function () {
  map.getViewPort().resize();
});

// Basic behavior: Zooming and panning
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// tutorial3 convert location into a waypoint
function locationToWaypointString(coordinates) {
  return 'geo!' + coordinates.lat + ',' + coordinates.lng;
}

// User location via browser's geolocation API, tutorial2
function updatePosition (event) {
  var coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  // Add a new marker every time the position changes, tutorial2
  var marker = new H.map.Marker(coordinates);
  map.addObject(marker);
  // Recenter the map every time the position changes
  map.setCenter(coordinates);
  // tutorial3 calculate and render router
  if(!routeRendered) {
    var route = new HERERoute(map, platform, {
      // calculateRouteParams object
      'mode': 'fastest;car',
      // start and end point
      'waypoint0': 'geo!52.530974,13.384944', //HERE HQ in Berlin
      'waypoint1': 'geo!52.5206,13.3862',  // Friedrichstraße Railway Station in Berlin
      'representation': 'display'
    });
    routeRendered = true;
  }
}

navigator.geolocation.watchPosition(updatePosition); //tutorial2

// var watchID = navigator.geolocation.watchPosition(function(position) {
// 	// Do something interesting here, tutorial2
// });
// // clearWatch to stop watching for location updates
// navigator.geolocation.clearWatch(watchID);


// Marker with custom icon
// var iconUrl = './images/marker-gelato.svg';
var iconUrl = "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon";

var iconOptions = {
  size: new H.math.Size(26, 34),
  anchor: new H.math.Point(14, 34)
  // icon size and anchorage point in pixel default to bottom-center
};

var markerOptions = {
  icon: new H.map.Icon(iconUrl, iconOptions)
};

var marker = new H.map.Marker(HEREHQcoordinates, markerOptions);
map.addObject(marker); //map.removeObject(marker) remove markers

// tutorial3
var route = new HERERoute(map, platform, {
  // calculateRouteParams object
  'mode': 'fastest;car',
  // start and end point
  'waypoint0': 'geo!52.530974,13.384944', //HERE HQ in Berlin
  'waypoint1': 'geo!52.5206,13.3862',  // Friedrichstraße Railway Station in Berlin
  'representation': 'display'
});
