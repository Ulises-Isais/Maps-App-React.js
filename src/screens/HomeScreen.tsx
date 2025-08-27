import {
  BtnSelectLocation,
  MapView,
  ReactLogo,
  SearchBar,
} from "../components";
import { BtnMyLocation } from "../components/BtnMyLocation";

export const HomeScreen = () => {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <BtnSelectLocation />
      <ReactLogo />
      <SearchBar />
    </div>
  );
};
