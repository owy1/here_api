var mapContainer = document.getElementById('map-container');

var platform = new H.service.Platform({
  app_id: '82Rr651K5ESuat9mVcUW', // // <-- ENTER YOUR APP ID HERE
  app_code: 'iNN2uYP8SzZZj_nDsOk6AQ', // <-- ENTER YOUR APP CODE HERE
  // Only necessary if served over HTTPS:
  useHTTPS: true
});

var HEREHQcoordinates = {
  // // HERE HQ in Berlin, Germany:
  // lat: 52.530974,
  // lng: 13.384944
  // Alderwood Mall, WA USA:
  lat: 47.8314859,
  lng: -122.2645744
};

// Displaying the map
var mapOptions = {
  center: HEREHQcoordinates,
  zoom: 20
};

var map = new HEREMap(mapContainer, platform, mapOptions);
