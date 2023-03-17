import { choiceImages } from "../../../utils/choices";
import classes from "./TableList.module.scss";

const TableList = ({ nickname, round, winner, userChoice, houseChoice }) => {
  return (
    <div className={classes.container}>
      <div className={classes.container_part}>
        <div>{round}</div>
        <div>{winner}</div>
      </div>
      <div className={classes.container_part}>
        <div className={winner === nickname ? classes.winner : ""}>
          {choiceImages[userChoice]}
        </div>
        <div className={winner === "House" ? classes.winner : ""}>
          {choiceImages[houseChoice]}
        </div>
      </div>
    </div>
  );
};

export default TableList;
