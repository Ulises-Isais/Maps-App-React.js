import { useReducer, type JSX } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

export interface MapsState {
  isMapReady: boolean;
  map?: mapboxgl.Map;
}

const INITIAL_STATE: MapsState = {
  isMapReady: false,
  map: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = (map: mapboxgl.Map) => {
    const myLocationPopup = new window.mapboxgl.Popup()
      .setHTML(`<h4>Aquí estoy</h4>
  <p>En algun lugar del mundo</p>`);

    new window.mapboxgl.Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        //Methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
