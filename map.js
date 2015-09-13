L.mapbox.accessToken = 'pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw';
var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: true
}).setView([40, -74.50], 9);

var stopsLayer = L.geoJson(stops, {
    style: function(feature) {
        return feature.properties;
    },
    onEachFeature: function(feature, layer) {
        popupContent = "<b>" + feature.properties.name + "</b><br>" + feature.properties.description
        layer.bindPopup(popupContent);
    }
})

var directions = L.mapbox.directions();
var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(map);
var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions);

var index = -1
stopsLayer.eachLayer(function(layer) {
    var type = layer.feature.properties.type;
    var coords = layer.feature;
    if (type == 'origin') {
        directions.setOrigin(coords);
    } else if (type == 'destination') {
        directions.setDestination(coords)
    } else if (type == 'waypoint') {
        directions.setWaypoint(index, coords)
    };
    index += 1;
});

if (directions.queryable()) {
    console.log(directions);
    directions.query();
}



stopsLayer.addTo(map);
map.fitBounds(stopsLayer.getBounds());