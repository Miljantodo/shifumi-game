import classNames from "classnames";
import { choiceImages } from "../../../utils/choices";
import classes from "./TableList.module.scss";

const TableList = ({ nickname, round, winner, userChoice, houseChoice }) => {
  const isOdd = (n) => {
    return n % 2 == 1;
  };

  return (
    <div
      className={classNames(classes.container, isOdd(round) && classes.shadow)}
    >
      <div className={classes.container_left}>
        <div className={classes.container_round}>{round}</div>
        <div className={classes.container_winner}>{winner}</div>
      </div>
      <div className={classes.container_right}>
        <div
          className={classNames(
            classes.resize_icon,
            winner === nickname ? classes.winner : ""
          )}
        >
          {choiceImages[userChoice]}
        </div>
        <div
          className={classNames(
            classes.resize_icon,
            winner === "House" ? classes.winner : ""
          )}
        >
          {choiceImages[houseChoice]}
        </div>
      </div>
    </div>
  );
};

export default TableList;
