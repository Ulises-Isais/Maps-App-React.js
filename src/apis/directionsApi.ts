import axios from "axios";

const accesToken = import.meta.env.VITE_MAPBOX_TOKEN;

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    access_token: accesToken,
  },
});

export default directionsApi;
