import { createContext } from "react";

interface MapContextProps {
  isMapReady: boolean;
  map?: mapboxgl.Map;

  //Methods
  setMap: (map: mapboxgl.Map) => void;
}

export const MapContext = createContext({} as MapContextProps);
