// libs
import classNames from "classnames";

// utils
import { choiceImages } from "../../utils/choices";

// styles
import classes from "./TableItem.module.scss";

const TableItem = ({ username, first, second, third, fourth, userChoice, houseChoice }) => {
  return (
    <div className={classes.container}>
      <div className={classes.container_left}>
        <div className={classes.container_first}>{first}</div>
        <div className={classes.container_second}>{second}</div>
      </div>
      {username ? <div className={classes.container_right}>
          <div
            className={classNames(
              classes.resize_icon,
              second === username ? classes.winner : ""
            )}
          >
            {choiceImages[userChoice]}
          </div>
          <div
            className={classNames(
              classes.resize_icon,
              second === "House" ? classes.winner : ""
            )}
          >
            {choiceImages[houseChoice]}
          </div>
      </div>:           
      <div className={classes.container_right}>
            <div>{third}</div>
            <div className={classes.resize_icon}>{fourth}</div>
          </div>}
    </div>
  );
};

export default TableItem;
