L.mapbox.accessToken = 'pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw';
var map = L.mapbox.map('map').setView([40, -74.50], 9);


var stopsLayer = L.mapbox.featureLayer(stops, {
    style: function(feature) {
        console.log(feature.properties);
        return feature.properties;
    }
})

var directions = L.mapbox.directions();
directions.setProfile('mapbox.cycling');
var directionsLayer = L.mapbox.directions.layer(directions, {
        routeStyle: {
            color: "#5F021F"
        }
    })
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
    } else if (type == 'waypoint' || type == 'viapoint') {
        directions.setWaypoint(index, coords)
    };
    index += 1;
});

if (directions.queryable()) {
    directions.query();
}

directions.on('load', function(e) {
    distance = e.routes[0].distance;
    duration = e.routes[0].duration;
    var routeDetails = 'Estimated Route: ' + Math.round(distance / 1000) + ' km, ' + Math.round(duration / 60) + ' min'
    console.log(routeDetails)
})

stopsLayer.addTo(map);
map.fitBounds(stopsLayer.getBounds());


L.control.layers({
    'Outdoords': L.mapbox.tileLayer('allryder.neba5b9p').addTo(map),
    'Streets': L.mapbox.tileLayer('mapbox.streets'),
    'Satellite': L.mapbox.tileLayer('allryder.nebb4k35')
}).addTo(map);
