import type { MapsState } from "./MapProvider";

type MapAction = { type: "setMap"; payload: mapboxgl.Map };

export const mapReducer = (state: MapsState, action: MapAction): MapsState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    //     break;

    default:
      return state;
  }
};
