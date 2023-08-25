import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { southAmericaGeoJSON } from "./json/SouthAmerica/southamerica.js";
import { Asia } from "./json/Asia/asia.js";
import { NorthAmerica } from "./json/NorthAmerica/northamerica.js";
import { Europe } from "./json/Europe/europe.js";
import { Africa } from "./json/Africa /africa.js";

function App() {
  const [showButton, setShowButton] = useState(false);

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
        data: southAmericaGeoJSON,
      });
      map.addSource("Asia", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Asia,
        },
      });
      map.addSource("north-america", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: NorthAmerica,
        },
      });
      map.addSource("europe", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Europe,
        },
      });
      map.addSource("africa", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Africa,
        },
      });

      //Africa
      map.addLayer({
        id: "africa-layer",
        type: "fill",
        source: "africa",
        layout: {},
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.4,
        },
      });
      //Europe
      map.addLayer({
        id: "europe-layer",
        type: "fill",
        source: "europe",
        layout: {},
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.4,
        },
      });
      //Asia
      map.addLayer({
        id: "asia-layer",
        type: "fill",
        source: "Asia",
        layout: {},
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.4,
        },
      });
      //South America
      map.addLayer({
        id: "south-america-layer",
        type: "fill",
        source: "south-america",
        layout: {},
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.4, // Normal opacity
        },
      });
      //North America
      map.addLayer({
        id: "north-america-layer",
        type: "fill",
        source: "north-america",
        layout: {},
        paint: {
          "fill-color": "#FFFFFF",
          "fill-opacity": 0.4, // Normal opacity
        },
      });

      // Coordinates for South America label
      const SAlabelCoordinates = [-58, -10]; // Approximate center of South America

      const NAlabelCoordinates = [-100, 38]; // Approximate center of North America

      const EUlabelCoordinates = [375, 48]; // Europe

      const AFCoordinates = [380, 10]; // Africa

      const ASCoordinates = [450, 30]; // Asia

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
                coordinates: SAlabelCoordinates,
              },
            },
          ],
        },
      });
      map.addSource("north-america-label", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: NAlabelCoordinates,
              },
            },
          ],
        },
      });
      map.addSource("europe-label", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: EUlabelCoordinates,
              },
            },
          ],
        },
      });
      map.addSource("africa-label", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: AFCoordinates,
              },
            },
          ],
        },
      });
      map.addSource("asia-label", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: ASCoordinates,
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
      // Add layer for North America label
      map.addLayer({
        id: "north-america-label-layer",
        type: "symbol",
        source: "north-america-label",
        layout: {
          "text-field": "North America", // Label text
          "text-size": 24, // Text size
        },
        paint: {
          "text-color": "#FFFFFF", // Text color
        },
      });
      // Add layer for Europe label
      map.addLayer({
        id: "europe-label-layer",
        type: "symbol",
        source: "europe-label",
        layout: {
          "text-field": "Europe", // Label text
          "text-size": 24, // Text size
        },
        paint: {
          "text-color": "#FFFFFF", // Text color
        },
      });
      // Add layer for Africa label
      map.addLayer({
        id: "africa-label-layer",
        type: "symbol",
        source: "africa-label",
        layout: {
          "text-field": "Africa", // Label text
          "text-size": 24, // Text size
        },
        paint: {
          "text-color": "#FFFFFF", // Text color
        },
      });
      // Add layer for Asia label
      map.addLayer({
        id: "asia-label-layer",
        type: "symbol",
        source: "asia-label",
        layout: {
          "text-field": "Asia", // Label text
          "text-size": 24, // Text size
        },
        paint: {
          "text-color": "#FFFFFF", // Text color
        },
      });
    });

    // Add click event listener to the map
    map.on("click", (e) => {
      const ButtonCoordinates = [-100, -10];

      // Check if source and layer already exist
      if (!map.getSource("button-label")) {
        map.addSource("button-label", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: ButtonCoordinates,
                },
              },
            ],
          },
        });
      }

      if (!map.getLayer("button-layer")) {
        map.addLayer({
          id: "button-layer",
          type: "symbol",
          source: "button-label",
          layout: {
            "text-field": "Back", // Label text
            "text-size": 24, // Text size
          },
          paint: {
            "text-color": "#FFFFFF", // Text color
          },
        });
      }

      // Query the features at the clicked point
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["button-layer", "south-america-label-layer"], // Include the button layer as well
      });

      // Check if the button was clicked
      if (features.some((feature) => feature.layer.id === "button-layer")) {
        map.flyTo({
          center: [0, 0], // Original center
          zoom: 1, // Original zoom
        });
      } else if (
        features.some(
          (feature) => feature.layer.id === "south-america-label-layer"
        )
      ) {
        // Check if the title label was clicked
        map.flyTo({
          center: e.lngLat,
          zoom: 3, // Desired zoom level when the title is clicked
        });
      }
    });

    map.on("click", (e) => {
      // Query the features at the clicked point
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["north-america-label-layer"], // Specify the layer containing the title
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
    map.on("click", (e) => {
      // Query the features at the clicked point
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["africa-label-layer"], // Specify the layer containing the title
      });

      // Check if the title label was clicked
      if (features.length > 0) {
        // Zoom in to the clicked location
        map.flyTo({
          center: e.lngLat,
          zoom: 2.8, // Desired zoom level when the title is clicked
        });
      }
    });
    map.on("click", (e) => {
      // Query the features at the clicked point
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["europe-label-layer"], // Specify the layer containing the title
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
    map.on("click", (e) => {
      // Query the features at the clicked point
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["asia-label-layer"], // Specify the layer containing the title
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
