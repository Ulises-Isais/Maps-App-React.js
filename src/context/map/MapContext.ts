import { createContext } from "react";

interface MapContextProps {
  isMapReady: boolean;
  map?: mapboxgl.Map;

  //Methods
  setMap: (map: mapboxgl.Map) => void;
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext({} as MapContextProps);
