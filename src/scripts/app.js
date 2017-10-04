var mapContainer = document.getElementById('map-container');

var platform = new H.service.Platform({
  app_id: '82Rr651K5ESuat9mVcUW', // // <-- ENTER YOUR APP ID HERE
  app_code: 'iNN2uYP8SzZZj_nDsOk6AQ', // <-- ENTER YOUR APP CODE HERE
  // Only necessary if served over HTTPS:
  useHTTPS: true
});
var toCoordinates = {
  // Pike Place Market:
  lat: 47.6101,
  lng: -122.3421
};
var fromCoordinates = {
  // Seattle Center:
  lat: 47.6205,
  lng: -122.3493
};

// Displaying the map
var mapOptions = {
  center: fromCoordinates,
  zoom: 3
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

function locationToWaypointString(toCoordinates) {
  return 'geo!' + toCoordinates.lat + ',' + toCoordinates.lng;
}

var routeRendered = false;

// User location via browser's geolocation API
function updatePosition (event) {
  var toCoordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  // Add a new marker every time the position changes
  var markerTo = new H.map.Marker(toCoordinates);
  map.addObject(markerTo);
  var markerFrom = new H.map.Marker(fromCoordinates);
  map.addObject(markerFrom);

  // If the route has not been rendered yet, calculate and render it
  if (!routeRendered) {

    var route = new HERERoute(map, platform, {
      mode: 'fastest;car',
      representation: 'display',
      waypoint0: locationToWaypointString(fromCoordinates),
      waypoint1: locationToWaypointString(toCoordinates)
    });

    routeRendered = true;
  }
}

navigator.geolocation.watchPosition(updatePosition);
