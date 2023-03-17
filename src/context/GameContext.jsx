import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [nickname, setNickname] = useState("Player");
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(1);
  const [finalResult, setFinalResult] = useState(null);
  const [score, setScore] = useState({
    rounds: [],
    totalUserScore: 0,
    totalHouseScore: 0,
  });

  return (
    <GameContext.Provider
      value={{
        nickname,
        currentRound,
        totalRounds,
        finalResult,
        score,
        setNickname,
        setCurrentRound,
        setTotalRounds,
        setFinalResult,
        setScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
