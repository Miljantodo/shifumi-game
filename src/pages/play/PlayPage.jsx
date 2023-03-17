// libs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";

// hooks
import useGameContext from "../../hooks/useGameContext";

// utils
import { choices, choiceImages, getRandomChoice } from "../../utils/choices";

// assets
import question from "../../assets/question-mark.svg";
import { ReactComponent as Loop } from "../../assets/animate-choices.svg";

// styles
import classes from "./PlayPage.module.scss";

const PlayPage = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [houseChoice, setHouseChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [finalWinner, setFinalWinner] = useState(null);
  const {
    nickname,
    currentRound,
    setCurrentRound,
    totalRounds,
    score,
    setScore,
  } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentRound(1);
    setScore({
      rounds: [],
      totalUserScore: 0,
      totalHouseScore: 0,
    });
  }, []);

  useEffect(() => {
    setHouseChoice(getRandomChoice());
    setUserChoice(null);
    setResultMessage(null);
    setFinalWinner(null);
  }, [currentRound]);

  useEffect(() => {
    if (currentRound === totalRounds) {
      calculateFinalWinner();
    }
  }, [score]);

  const clickHandler = (chosen) => {
    setUserChoice(chosen);
    calculateWinner(chosen, houseChoice);
  };

  const calculateWinner = (user, house) => {
    switch (true) {
      case user === house:
        setScore((oldScore) => {
          return {
            ...oldScore,
            rounds: [
              ...oldScore.rounds,
              { user: user, house: house, winner: "Tie" },
            ],
          };
        });
        setResultMessage("Tie!");
        break;
      case user === "rock" && house === "scissors":
      case user === "paper" && house === "rock":
      case user === "scissors" && house === "paper":
        setScore((oldScore) => {
          return {
            totalUserScore: oldScore.totalUserScore + 1,
            totalHouseScore: oldScore.totalHouseScore,
            rounds: [
              ...oldScore.rounds,
              { user: user, house: house, winner: "User" },
            ],
          };
        });
        setResultMessage(`${nickname} wins!`);
        break;
      default:
        setScore((oldScore) => {
          return {
            totalUserScore: oldScore.totalUserScore,
            totalHouseScore: oldScore.totalHouseScore + 1,
            rounds: [
              ...oldScore.rounds,
              { user: user, house: house, winner: "House" },
            ],
          };
        });
        setResultMessage("House wins!");
    }
  };
  const calculateFinalWinner = () => {
    switch (true) {
      case score.totalUserScore > score.totalHouseScore:
        setFinalWinner("You have won!");
        break;
      case score.totalHouseScore > score.totalUserScore:
        setFinalWinner("You have lost.");
        break;
      default:
        setFinalWinner("It's a tie.");
    }
  };

  const renderChoices = () => {
    return (
      <div className={classes.choices_buttons}>
        {choices.map((choice) => {
          return (
            <Button
              disabled={!!userChoice}
              className={
                !userChoice
                  ? classes.square_btn
                  : userChoice === choice && classes.selected_btn
              }
              key={`${choice}`}
              onClick={() => {
                clickHandler(choice);
              }}
            >
              <div className={classes.scale_btn}>{choiceImages[choice]}</div>
            </Button>
          );
        })}
      </div>
    );
  };

  const renderCurrentResult = () => {
    return (
      <>
        {currentRound === totalRounds ? (
          <>
            <Button
              className={classes.round_btn}
              onClick={() => {
                navigate("/result");
              }}
            >
              Results
            </Button>
          </>
        ) : (
          <Button
            className={classes.round_btn}
            onClick={() => {
              setCurrentRound(currentRound + 1);
            }}
          >
            Next Round
          </Button>
        )}
      </>
    );
  };

  return (
    <Layout>
      <Header>{!userChoice ? "Your move" : finalWinner}</Header>
      <div className={classes.score_board}>
        <div className={classes.choice}>
          <h3 className={classes.small_header}>{`${nickname}`}</h3>
          <div className={classes.choice_frame}>
            {userChoice ? (
              choiceImages[userChoice]
            ) : (
              <img src={question} alt="question-icon" />
            )}
          </div>
        </div>
        <div className={classes.game_score}>
          <div
            className={classes.score_smaller}
          >{`${currentRound} / ${totalRounds}`}</div>
          <div
            className={classes.score_small}
          >{`${score.totalUserScore} : ${score.totalHouseScore}`}</div>
          <div className={classes.game_result}>{resultMessage}</div>
        </div>
        <div className={classes.choice}>
          <h3 className={classes.small_header}>{"House"}</h3>
          <div className={classes.choice_frame}>
            {userChoice ? choiceImages[houseChoice] : <Loop />}
          </div>
        </div>
      </div>
      <div className={classes.choices}>
        {renderChoices(userChoice)}
        <div className={classes.choices_stage}>
          {!finalWinner && (
            <button
              className={classes.retire}
              onClick={() => {
                navigate("/result");
              }}
            >
              Give up
            </button>
          )}
          {resultMessage && renderCurrentResult()}
        </div>
      </div>
    </Layout>
  );
};

export default PlayPage;
