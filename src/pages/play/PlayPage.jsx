// libs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";

// hooks
import useGameContext from "../../hooks/useGameContext";

// utils
import { choices, choiceImages, getRandomChoice } from "../../utils/choices";

// styles
import classes from "./PlayPage.module.scss";

const PlayPage = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [houseChoice, setHouseChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const { nickname, currentRound, setCurrentRound, totalRounds, setScore } =
    useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentRound(1);
    setScore({ user: 0, house: 0 });
  }, []);

  useEffect(() => {
    setHouseChoice(getRandomChoice());
    setUserChoice(null);
    setResultMessage(null);
  }, [currentRound]);

  const clickHandler = (chosen) => {
    setUserChoice(chosen);
    calculateWinner(chosen, houseChoice);
  };

  const calculateWinner = (user, house) => {
    switch (true) {
      case user === "rock" && house === "scissors":
      case user === "paper" && house === "rock":
      case user === "scissors" && house === "paper":
        setScore((oldScore) => {
          return { user: oldScore.user + 1, house: oldScore.house };
        });
        setResultMessage("You won!");
        break;
      case user === house:
        setResultMessage("The result is a tie!");
        break;
      default:
        setScore((oldScore) => {
          return { user: oldScore.user, house: oldScore.house + 1 };
        });
        setResultMessage("You lost!");
    }
  };

  const renderChoices = () => {
    return (
      <>
        <div
          className={classes.choices}
        >{`This game has ${totalRounds} rounds total. Get ready for round ${currentRound} !`}</div>
        <div className={classes.choices}>
          {choices.map((choice) => {
            return (
              <Button
                onClick={() => {
                  clickHandler(choice);
                }}
              >
                <img src={choiceImages[choice]} alt={`${choice}-icon`} />
              </Button>
            );
          })}
        </div>
      </>
    );
  };

  const renderCurrentResult = () => {
    return (
      <>
        <div
          className={classes.game_result}
        >{`Game ${currentRound} of ${totalRounds}`}</div>
        <div className={classes.game_result}>{resultMessage}</div>
        <div className={classes.choices}>
          <div className={classes.choice}>
            {`${nickname}`}
            <img src={choiceImages[userChoice]} alt="user-choice" />
          </div>
          VS
          <div className={classes.choice}>
            House
            <img src={choiceImages[houseChoice]} alt="house-choice" />
          </div>
        </div>
        {currentRound === totalRounds ? (
          <Button
            onClick={() => {
              navigate("/result");
            }}
          >
            Go to results.
          </Button>
        ) : (
          <Button
            onClick={() => {
              setCurrentRound(currentRound + 1);
            }}
          >
            Next Round.
          </Button>
        )}
      </>
    );
  };

  return (
    <Layout>{!resultMessage ? renderChoices() : renderCurrentResult()}</Layout>
  );
};

export default PlayPage;
