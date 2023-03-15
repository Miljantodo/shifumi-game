import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw Error("GameContext should be used inside GameContextProvider");
  }

  return context;
};

export default useGameContext;
