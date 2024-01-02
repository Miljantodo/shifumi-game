// libs
import { useNavigate } from "react-router-dom";

//components
import Button from "../../../components/button/Button";

// utils
import { choices, choiceImages } from "../../../utils/choices";

// hooks
import useGameContext from "../../../hooks/useGameContext";

// styles
import classes from "./GameChoices.module.scss";

const GameChoices = ({
  userChoice,
  setUserChoice,
  clickHandler,
  resultMessage,
}) => {
  const {
    currentRound,
    setCurrentRound,
    totalRounds,
    finalResult,
    setFinalResult,
    setScore,
  } = useGameContext();
  const navigate = useNavigate();

  const renderActionButtons = () => {
    return (
      <>
        {currentRound === totalRounds && finalResult ? (
          <>
            <Button
              className={classes.round_btn}
              onClick={() => {
                navigate("/result");
              }}
            >
              Results
            </Button>
            <Button
              className={classes.retire}
              onClick={() => {
                setFinalResult(null);
                setScore({
                  rounds: [],
                  totalUserScore: 0,
                  totalHouseScore: 0,
                  totalTies: 0
                });
                setUserChoice(null);
                setCurrentRound(1);
              }}
            >
              Play Again
            </Button>
          </>
        ) : (
          <>
            {userChoice && (
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
        )}
      </>
    );
  };

  return (
    <div className={classes.choices}>
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
      <div className={classes.choices_stage}>
        <div className={classes.choices_stage_current}>
          {resultMessage && renderActionButtons()}
        </div>
        {!finalResult && (
          <Button
            className={classes.retire}
            onClick={() => {
              navigate("/result");
            }}
          >
            Concede
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameChoices;
