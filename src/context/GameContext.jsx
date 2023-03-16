import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [nickname, setNickname] = useState("Player");
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(1);
  const [score, setScore] = useState({ user: 0, house: 0 });

  return (
    <GameContext.Provider
      value={{
        nickname,
        currentRound,
        totalRounds,
        score,
        setNickname,
        setCurrentRound,
        setTotalRounds,
        setScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
