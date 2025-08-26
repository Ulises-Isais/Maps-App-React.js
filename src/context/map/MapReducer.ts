import type { MapsState } from "./MapProvider";

type MapAction =
  | { type: "setMap"; payload: mapboxgl.Map }
  | { type: "setMarkers"; payload: mapboxgl.Marker[] };

export const mapReducer = (state: MapsState, action: MapAction): MapsState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };

    case "setMarkers":
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return state;
  }
};
