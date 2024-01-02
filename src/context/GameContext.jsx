// libs
import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [username, setUsername] = useState("Player");
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(3);
  const [finalResult, setFinalResult] = useState(null);
  const [score, setScore] = useState({
    rounds: [],
    totalUserScore: 0,
    totalHouseScore: 0,
    totalTies: 0
  });

  return (
    <GameContext.Provider
      value={{
        username,
        currentRound,
        totalRounds,
        finalResult,
        score,
        setUsername,
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
