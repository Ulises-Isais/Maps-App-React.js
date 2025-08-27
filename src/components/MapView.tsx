import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const MapView = () => {
  const { isLoading, userLocation, setUserLocation, selecting, setSelecting } =
    useContext(PlacesContext);
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

      map.on("click", (e) => {
        if (!selecting) return;
        const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setUserLocation(coords);
        setSelecting(false);
      });

      // Limpiar el mapa al desmontar
      return () => {
        map.remove();
      };
    }
  }, [isLoading, userLocation, selecting]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div
        ref={mapDiv}
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
      <div>{userLocation?.join(",")}</div>
    </div>
  );
};
