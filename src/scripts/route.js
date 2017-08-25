var coordinates = {
  // Pike Place Market:
  lat: 47.6101,
  lng: -122.3421
};

var SNcoordinates = {
  // Seattle Center:
  lat: 47.6205,
  lng: -122.3493
};

function HERERoute (map, platform, routeOptions) {

  var router = platform.getRoutingService();

  var onSuccess = function(result) {
    var route,
      routeShape,
      startPoint,
      endPoint,
      strip;

    route = new HERERoute(map, platform, {
        mode: 'fastest;car',
        representation: 'display',
        waypoint0: locationToWaypointString(coordinates),
        waypoint1: locationToWaypointString(SNcoordinates)
    });

    if(result.response.route) {
      // Pick the first route from the response:
      route = result.response.route[0];
      // Pick the route's shape:
      routeShape = route.shape;

      // Create a strip to use as a point source for the route line
      strip = new H.geo.Strip();

      // Push all the points in the shape into the strip:
      routeShape.forEach(function(point) {
        var parts = point.split(',');
        strip.pushLatLngAlt(parts[0], parts[1]);
      });

      // Create a polyline to display the route:
      var routeLine = new H.map.Polyline(strip, {
        style: { strokeColor: 'blue', lineWidth: 10 }
      });

      // Add the route polyline to the map
      map.addObject(routeLine);

      // Set the map's viewport to make the whole route visible:
      map.setViewBounds(routeLine.getBounds());
    }
  };

  var onError = function(error) {
    console.error('resource not found!', error);
  };

  router.calculateRoute(routeOptions, onSuccess, onError);
}
