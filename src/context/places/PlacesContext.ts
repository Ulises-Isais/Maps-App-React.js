import { createContext } from "react";
import type { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  selecting: boolean;
  //Methods
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
  setUserLocation: (coord: [number, number]) => void;
  setSelecting: (value: boolean) => void;
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
