// libs
import classNames from "classnames";

// utils
import { choiceImages } from "../../../utils/choices";

// styles
import classes from "./TableItem.module.scss";

const TableItem = ({ nickname, round, winner, userChoice, houseChoice }) => {
  return (
    <div className={classes.container}>
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

export default TableItem;
