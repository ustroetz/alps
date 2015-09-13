L.mapbox.accessToken = 'pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw';
var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: true
}).setView([40, -74.50], 9);

var stopsLayer = L.geoJson(stops, {
	style: function(feature) { return feature.properties; },
    onEachFeature: function(feature, layer) {
    	popupContent = "<b>" + feature.properties.name + "</b><br>" + feature.properties.description
        layer.bindPopup(popupContent);
    }
})



var directions = L.mapbox.directions();

// var directionsLayer = L.mapbox.directions.layer(directions)
//     .addTo(map);



stopsLayer.addTo(map);
map.fitBounds(stopsLayer.getBounds());

