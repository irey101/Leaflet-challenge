// Define earthquakes plates GeoJSON url variable
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var geojson;

// Set up the Leaflet map
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add the OpenStreetMap tiles to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Retrieve the earthquake data and create the map
d3.json(geoData).then(function(data) {
  // Define a function to set the style of each earthquake marker
  function mapStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: mapColor(feature.geometry.coordinates[2]), // color based on depth
      color: "#000000",
      radius: mapRadius(feature.properties.mag), // size based on magnitude
      stroke: true,
      weight: 0.5
    };
  }

  // Define a function to set the color based on depth
  function mapColor(depth) {
    switch (true) {
      case depth > 90:
        return "red";
      case depth > 70:
        return "orangered";
      case depth > 50:
        return "orange";
      case depth > 30:
        return "gold";
      case depth > 10:
        return "yellow";
      default:
        return "lightgreen";
    }
  }

  // Define a function to set the size based on magnitude
  function mapRadius(mag) {
    if (mag === 0) {
      return 1;
    }
    return mag * 4;
  }

  // Add the GeoJSON layer to the map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: mapStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "Magnitude: " +
          feature.properties.mag +
          "<br>Location: " +
          feature.properties.place +
          "<br>Depth: " +
          feature.geometry.coordinates[2]
      );
    }
  }).addTo(myMap);

  // Add legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
      depth = [-10, 10, 30, 50, 70, 90];
    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        mapColor(depth[i] + 1) +
        '"></i> ' +
        depth[i] +
        (depth[i + 1] ? "&ndash;" + depth[i + 1] + "<br>" : "+");
    }
    return div;
  };
  legend.addTo(myMap);
});

// Define the URL for the GeoJSON earthquake data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map
var myMap = L.map("map", {
    center: [37.09, -95.71], // Center the map to the USA
    zoom: 5 // Set the initial zoom level
});

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Retrieve and add the earthquake data to the map
d3.json(url).then(function (data) {

    // Define the style for each earthquake feature
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]), // Call the function to set the fill color based on depth
            color: "black",
            radius: mapRadius(feature.properties.mag), // Call the function to set the radius based on magnitude
            stroke: true,
            weight: 0.5
        };
    }

    // Define the color scale based on the depth of the earthquake
    function mapColor(depth) {
        switch (true) {
            case depth > 90:
                return "red";
            case depth > 70:
                return "orangered";
            case depth > 50:
                return "orange";
            case depth > 30:
                return "gold";
            case depth > 10:
                return "yellow";
            default:
                return "lightgreen";
        }
    }

    // Define the radius of the circle based on the magnitude of the earthquake
    function mapRadius(mag) {
        if (mag === 0) {
            return 1;
        }
        return mag * 4;
    }

    // Add earthquake data to the map
    L.geoJson(data, {

        // Create a circle marker for each earthquake feature
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        style: mapStyle,

        // Activate pop-up data when circles are clicked
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
        }
    }).addTo(myMap);

    // Add the legend with colors to correlate with depth
    var legend = L.control({position: "bottomright"}); // Set the position of the legend
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend"),
            depth = [-10, 10, 30, 50, 70, 90];

        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + mapColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
});
