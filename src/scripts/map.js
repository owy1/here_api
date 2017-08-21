// tutorial4 starts here

function HEREMap (mapContainer, platform, mapOptions) {
  this.platform = platform;
  this.position = mapOptions.center;

  var defaultLayers = platform.createDefaultLayers();

// Instantiate wrapped HERE map
  this.map = new H.Map(mapContainer, defaultLayers.normal.map, mapOptions);

// Zooming and panning
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

// Display user's geolocation
  navigator.geolocation.watchPosition(this.updateMyPosition.bind(this));

// resize map as window size
  window.addEventListener('resize', this.resizeToFit.bind(this));
}

HEREMap.prototype.updateMyPosition = function(event) {
  this.position = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  if (!this.route) {
    this.drawRoute(this.position, HEREHQcoordinates);
  }

// remove old location marker
  if (this.myLocationMarker) {
    this.removeMarker(this.myLocationMarker);
  }

  this.myLocationMarker = this.addMarker(this.position, 'iceCream');
  this.map.setCenter(this.position);
};

HEREMap.prototype.addMarker = function(coordinates,icon) {
  var markerOptions = {};

  // Dictonary for icon data
  var icons = {
    iceCream: {
      url: "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      options: {
        size: new H.math.Size(26, 34),
        anchor: new H.math.Point(14, 34)
      }
    },
    origin: {
      url: './images/origin.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    },
    destination: {
      url: './images/destination.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    }
  };

  if (icons[icon]) {
    markerOptions = {
      icon: new H.map.Icon(icons[icon].url, icons[icon].options)
    };
  }

  var marker = new H.map.Marker(coordinates, markerOptions);
  this.map.addObject(marker);

  return marker;
};

HEREMap.prototype.removeMarker = function(marker) {
  this.map.removeObject(marker);
};

// var fromCoordinates = '52.530974,13.384944'; //HERE HQ in Berlin
// var toCoordinates = '52.5206,13.3862'; //Friedrichstraße Railway Station in Berlin

HEREMap.prototype.drawRoute = function(fromCoordinates, toCoordinates) {
  var routeOptions = {
    // calculateRouteParams object
    mode: 'fastest;car',
    representation: 'display',
    alternatives: 2,
    routeattributes: 'waypoints, summary, shape, legs',
    // start and end point
    waypoint0:Utils.locationToWaypointString(fromCoordinates), //HERE HQ in Berlin
    waypoint1:Utils.locationToWaypointString(toCoordinates)  // Friedrichstraße Railway Station in Berlin
  };

  this.addMarker(fromCoordinates, 'origin');
  this.addMarker(toCoordinates, 'destination');

  this.route = new HERERoute(this.map, this.platform, routeOptions);
};

HEREMap.prototype.resizeToFit = function() {
  this.map.getViewPort().resize();
};
