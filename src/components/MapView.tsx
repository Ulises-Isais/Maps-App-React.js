import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading && mapDiv.current && window.mapboxgl) {
      // Crear el mapa
      const map = new window.mapboxgl.Map({
        container: mapDiv.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: userLocation,
        zoom: 14,
        accessToken: accessToken,
      });

      setMap(map);

      // Limpiar el mapa al desmontar
      return () => {
        map.remove();
      };
    }
  }, [isLoading, userLocation]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={mapDiv}
        style={{
          backgroundColor: "red",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
      <div style={{ position: "absolute", top: 10, color: "black" }}>
        {userLocation?.join(",")}
      </div>
    </div>
  );
};
