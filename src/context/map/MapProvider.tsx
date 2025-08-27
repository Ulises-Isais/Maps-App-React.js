import { useContext, useEffect, useReducer, type JSX } from "react";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

import { PlacesContext } from "../places/PlacesContext";

import { directionsApi } from "../../apis";
import type { DirectionsResponse } from "../../interfaces/directions";

export interface MapsState {
  isMapReady: boolean;
  map?: mapboxgl.Map;
  markers: mapboxgl.Marker[];
  distance?: number; //kms
  duration?: number; //minutes
}

const INITIAL_STATE: MapsState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  distance: undefined,
  duration: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: mapboxgl.Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new window.mapboxgl.Popup().setHTML(
        `<h6>${place.text_es}</h6>
<p>${place.place_name_es}</p>`
      );
      const newMarker = new window.mapboxgl.Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [places]);

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

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    dispatch({
      type: "setRouteInfo",
      payload: { distance: kms, duration: minutes },
    });

    const bounds = new window.mapboxgl.LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    //Polyline
    const sourceData: mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        distance: state.distance,
        duration: state.duration,

        //Methods
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
