import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [nickname, setNickname] = useState("Miki");
  const [rounds, setRounds] = useState(1);
  const [score, setScore] = useState({ user: 0, house: 0 });

  return (
    <GameContext.Provider
      value={{ nickname, rounds, score, setNickname, setRounds, setScore }}
    >
      {children}
    </GameContext.Provider>
  );
};
