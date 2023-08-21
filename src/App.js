import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { southAmericaGeoJSON } from "./json/SouthAmerica/southamerica.js";

function App() {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxhbnRvdGhlIiwiYSI6ImNsbGszYjRqeDFyd3Mza28xMTYycGR6Z28ifQ.9uoVMHEzV7jdyh4cvCIeUg";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/alantothe/cllk0tcvb023z01ql0gskfr9k",
      center: [0, 0],
      zoom: 1,
      maxBounds: [-180, -90, 180, 90],
    });

    // South America GeoJSON data
    const labelCoordinates = [-60, -15];

    // Disable default zoom controls
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();

    map.on("load", () => {
      // Add GeoJSON source for South America
      map.addSource("south-america", {
        type: "geojson",
        data: southAmericaGeoJSON, // Make sure this variable contains the GeoJSON data for South America
      });

      // Add fill layer for South America
      map.addLayer({
        id: "south-america-layer",
        type: "fill",
        source: "south-america",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.4, // Normal opacity
        },
      });

      // Coordinates for South America label
      const labelCoordinates = [-60, -15]; // Approximate center of South America

      // Add source for South America label
      map.addSource("south-america-label", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: labelCoordinates,
              },
            },
          ],
        },
      });

      // Add layer for South America label
      map.addLayer({
        id: "south-america-label-layer",
        type: "symbol",
        source: "south-america-label",
        layout: {
          "text-field": "South America", // Label text
          "text-size": 24, // Text size
        },
        paint: {
          "text-color": "#FFFFFF", // Text color
        },
      });
    });

    // Add click event listener to the map
    map.on("click", (e) => {
      // Query the features at the clicked point
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["south-america-label-layer"], // Specify the layer containing the title
      });

      // Check if the title label was clicked
      if (features.length > 0) {
        // Zoom in to the clicked location
        map.flyTo({
          center: e.lngLat,
          zoom: 3, // Desired zoom level when the title is clicked
        });
      }
    });

    // Re-disable zooming once the zoom action is complete
    map.on("moveend", () => {
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();
    });
  }, []);

  return (
    <div className="App">
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
}

export default App;
