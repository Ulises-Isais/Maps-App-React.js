import { MapView, ReactLogo } from "../components";
import { BtnMyLocation } from "../components/BtnMyLocation";

export const HomeScreen = () => {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <ReactLogo />
    </div>
  );
};
