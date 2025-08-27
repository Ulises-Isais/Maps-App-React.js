import type { MapsState } from "./MapProvider";

type MapAction =
  | { type: "setMap"; payload: mapboxgl.Map }
  | { type: "setMarkers"; payload: mapboxgl.Marker[] }
  | { type: "setRouteInfo"; payload: { distance: number; duration: number } };

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
    case "setRouteInfo":
      return {
        ...state,
        distance: action.payload.distance,
        duration: action.payload.duration,
      };

    default:
      return state;
  }
};
