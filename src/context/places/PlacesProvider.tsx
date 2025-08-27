import { useEffect, useReducer, useState, type JSX } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import type { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "setPlaces", payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error("no hay ubicación del usuario");

    dispatch({ type: "setLoadingPlaces" });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "setPlaces", payload: resp.data.features });
    return resp.data.features;
  };

  const setUserLocation = (coords: [number, number]) => {
    dispatch({ type: "setUserLocation", payload: coords });
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        selecting,
        setSelecting,
        //Methods
        searchPlacesByTerm,
        setUserLocation,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
