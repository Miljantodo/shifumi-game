// libs
import { useEffect, useState } from "react";

// components
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";

// hooks
import useGameContext from "../../hooks/useGameContext";

// utils
import { choiceImages, getRandomChoice } from "../../utils/choices";

// assets
import { ReactComponent as Question } from "../../assets/question-mark.svg";
import { ReactComponent as Loop } from "../../assets/animate-choices.svg";

// styles
import classes from "./GameplayPage.module.scss";
import GameScore from "./score/GameScore";
import GameChoices from "./choices/GameChoices";

const GameplayPage = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [houseChoice, setHouseChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  const {
    nickname,
    currentRound,
    setCurrentRound,
    totalRounds,
    finalResult,
    setFinalResult,
    score,
    setScore,
  } = useGameContext();

  useEffect(() => {
    setCurrentRound(1);
    setScore({
      rounds: [],
      totalUserScore: 0,
      totalHouseScore: 0,
    });
  }, []);

  useEffect(() => {
    setHouseChoice(null);
    setUserChoice(null);
    setResultMessage(null);
    setFinalResult(null);
  }, [currentRound]);

  useEffect(() => {
    if (currentRound === totalRounds && userChoice) {
      calculateFinalResult();
    }
  }, [score]);

  useEffect(() => {
    if (userChoice !== null) {
      calculateWinner(userChoice, houseChoice);
    }
  }, [userChoice]);

  const clickHandler = (chosen) => {
    setHouseChoice(getRandomChoice());
    setUserChoice(chosen);
  };

  const calculateWinner = (user, house) => {
    let newScore = {};
    let newMessage = "";

    switch (true) {
      case user === house:
        newScore = {
          rounds: [
            ...score.rounds,
            { user: user, house: house, winner: "Tie" },
          ],
        };
        newMessage = "Tie!";
        break;
      case user === "rock" && house === "scissors":
      case user === "paper" && house === "rock":
      case user === "scissors" && house === "paper":
        newScore = {
          totalUserScore: score.totalUserScore + 1,
          rounds: [
            ...score.rounds,
            { user: user, house: house, winner: nickname },
          ],
        };
        newMessage = `${nickname} wins!`;
        break;
      default:
        newScore = {
          totalHouseScore: score.totalHouseScore + 1,
          rounds: [
            ...score.rounds,
            { user: user, house: house, winner: "House" },
          ],
        };
        newMessage = "House wins!";
    }

    setResultMessage(newMessage);
    setScore({ ...score, ...newScore });
  };

  const calculateFinalResult = () => {
    let newfinalResult = "";

    switch (true) {
      case score.totalUserScore > score.totalHouseScore:
        newfinalResult = "You have won!";
        break;
      case score.totalHouseScore > score.totalUserScore:
        newfinalResult = "You have lost.";
        break;
      default:
        newfinalResult = "It's a tie.";
    }

    setFinalResult(newfinalResult);
  };

  return (
    <Layout>
      <Header>{!userChoice ? "Your move" : finalResult}</Header>
      <div className={classes.score_board}>
        <div className={classes.choice}>
          <h3 className={classes.small_header}>{`${nickname}`}</h3>
          <div className={classes.choice_frame}>
            {userChoice ? choiceImages[userChoice] : <Question />}
          </div>
        </div>
        <GameScore resultMessage={resultMessage} />
        <div className={classes.choice}>
          <h3 className={classes.small_header}>{"House"}</h3>
          <div className={classes.choice_frame}>
            {userChoice ? choiceImages[houseChoice] : <Loop />}
          </div>
        </div>
      </div>
      <GameChoices
        userChoice={userChoice}
        setUserChoice={setUserChoice}
        clickHandler={clickHandler}
        resultMessage={resultMessage}
      />
    </Layout>
  );
};

export default GameplayPage;
