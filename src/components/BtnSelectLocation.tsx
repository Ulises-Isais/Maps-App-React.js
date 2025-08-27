import { useContext } from "react";
import { PlacesContext } from "../context";

export const BtnSelectLocation = () => {
  const { selecting, setSelecting } = useContext(PlacesContext);

  const onClickSelect = () => {
    setSelecting(true); //Activar el modo selección
  };
  return (
    <button
      className="btn btn-warning"
      style={{
        background: selecting ? "red" : "orange",
        position: "fixed",
        top: "20px",
        right: "150px",
        zIndex: 999,
      }}
      onClick={onClickSelect}
    >
      {selecting ? "Haz click en el mapa" : "Seleccionar ubicación"}
    </button>
  );
};
