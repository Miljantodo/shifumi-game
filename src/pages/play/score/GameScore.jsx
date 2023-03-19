// hooks
import useGameContext from "../../../hooks/useGameContext";

// styles
import classes from "./GameScore.module.scss";

const GameScore = ({ resultMessage }) => {
  const { currentRound, totalRounds, score } = useGameContext();
  return (
    <div className={classes.game_score}>
      <div
        className={classes.score_smaller}
      >{`${currentRound} / ${totalRounds}`}</div>
      <div
        className={classes.score_small}
      >{`${score.totalUserScore} : ${score.totalHouseScore}`}</div>
      <div className={classes.game_result}>{resultMessage}</div>
    </div>
  );
};

export default GameScore;
