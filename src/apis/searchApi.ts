import axios from "axios";

const accesToken = import.meta.env.VITE_MAPBOX_TOKEN;

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token: accesToken,
  },
});

export default searchApi;
