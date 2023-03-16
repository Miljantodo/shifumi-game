import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import useGameContext from "../../hooks/useGameContext";
import rock from "../../assets/rock.svg";
import paper from "../../assets/paper.svg";
import scissors from "../../assets/scissors.svg";
import classes from "./PlayPage.module.scss";

const choices = [rock, paper, scissors];

const PlayPage = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [houseChoice, setHouseChoice] = useState(null);
  const { nickname, currentRound, setCurrentRound, totalRounds, score } =
    useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    randomHouseChoice();
    setCurrentRound(1);
    score.user = 0;
    score.house = 0;
  }, []);

  const randomHouseChoice = () => {
    const choice = choices[Math.floor(Math.random() * choices.length)];
    setHouseChoice(choice);
  };

  const clickHandler = (chosen) => {
    setUserChoice(chosen);
  };

  const calculateWinner = (choice1, choice2) => {
    if (choice1 === choice2) {
      return "The result is a tie!";
    } else if (choice1 === rock) {
      if (choice2 === scissors) {
        score.user++;
        return "You won!";
      } else {
        score.house++;
        return "You lost!";
      }
    } else if (choice1 === paper) {
      if ((choice2 = rock)) {
        score.user++;
        return "You won!";
      } else {
        score.house++;
        return "You lost!";
      }
    } else if (choice1 === scissors) {
      if (choice2 === paper) {
        score.user++;
        return "You won!";
      } else {
        score.house++;
        return "You lost!";
      }
    }
    return "Something went wrong";
  };

  return (
    <Layout>
      {!userChoice && (
        <>
          <div
            className={classes.choices}
          >{`This game has ${totalRounds} rounds total. Get ready for round ${currentRound} !`}</div>
          <div className={classes.choices}>
            <Button
              onClick={() => {
                clickHandler(choices[0]);
              }}
            >
              <img src={rock} alt="rock-icon" />
            </Button>
            <Button
              onClick={() => {
                clickHandler(choices[1]);
              }}
            >
              <img src={paper} alt="paper-icon" />
            </Button>
            <Button
              onClick={() => {
                clickHandler(choices[2]);
              }}
            >
              <img src={scissors} alt="scissors-icon" />
            </Button>
          </div>
        </>
      )}
      {userChoice && (
        <>
          <div
            className={classes.game_result}
          >{`Game ${currentRound} of ${totalRounds}`}</div>
          <div className={classes.game_result}>
            {calculateWinner(userChoice, houseChoice)}
          </div>
          <div className={classes.choices}>
            <div className={classes.choice}>
              {`${nickname}`}
              <img src={userChoice} alt="user-choice" />
            </div>
            VS
            <div className={classes.choice}>
              House
              <img src={houseChoice} alt="house-choice" />
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
                randomHouseChoice();
                setUserChoice(null);
              }}
            >
              Next Round.
            </Button>
          )}
        </>
      )}
    </Layout>
  );
};

export default PlayPage;
