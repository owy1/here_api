// tutorial3 starts here

// var platform = new H.service.Platform({
//   app_id: '82Rr651K5ESuat9mVcUW', // // <-- ENTER YOUR APP ID HERE
//   app_code: 'iNN2uYP8SzZZj_nDsOk6AQ', // <-- ENTER YOUR APP CODE HERE
//   // Only necessary if served over HTTPS:
//   useHTTPS: true
// });

function HERERoute(map, platform, routeOptions){
  var router = platform.getRoutingService();

  var routeLineStyles = {
    normal: { strokeColor: 'rgba(0, 85, 170, 0.5)', lineWidth: 3 },
    selected: { strokeColor: 'rgba(255, 0, 0, 0.7)', lineWidth: 7 }
  };
  var selectedRoute;

  // onSuccess callback
  var onSuccess = function(result){

    if (result.response.route) {
      var routeLineGroup = new H.map.Group();
      var routes = result.response.route.map(function(route){
        var routeLine = drawRoute(route);
        routeLineGroup.addObject(routeLine);
        return {
          route: route,
          routeLine: routeLine
        };
      });

      map.addObject(routeLineGroup);
      map.setViewBounds(routeLineGroup.getBounds());
      this.routePanel = new HERERoutesPanel(routes,
        { onRouteSelection: onRouteSelection }
      );
    }
  };

  // onError callback
  var onError = function(error){
    console.error('Oh no! There was some communication error!', error);
  };


  var onRouteSelection = function(route){
    console.log('A route has been selected.', route);
    if (selectedRoute){
      selectedRoute.routeLine.setStyle(routeLineStyles.normal).setZIndex(1);
    }
    route.routeLine.setStyle(routeLineStyles.selected).setZIndex(10); selectedRoute = route;
  };

  var drawRoute = function(route) {
    var routeShape = route.shape;
    var strip = new H.geo.Strip();

    routeShape.forEach(function(point){
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });
    var routeLine = new H.map.Polyline(strip, {
      style: { strokeColor: 'blue', lineWidth: 3 }
    });
    return routeLine;
  };

  router.calculateRoute(routeOptions, onSuccess, onError);
}
