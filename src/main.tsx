import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MapsApp } from "./MapsApp.tsx";
import "./index.css";

// import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
// mapboxgl.accessToken =
//   "pk.eyJ1IjoidWxpc2VzcmVhY3QiLCJhIjoiY21la3hoOHlkMGIxNDJqcTR6dWZkYWxsYyJ9.9eoKjHs5YpA_WlRFLNEXxA";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opción de Geolocation");
  throw new Error("Tu navegador no tiene opción de Geolocation");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>
);
