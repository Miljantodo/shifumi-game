// libs
import classNames from "classnames";

// styles
import classes from "./TableLabels.module.scss";

const TableLabels = ({
  firstLabel,
  secondLabel,
  thirdLabel,
  fourthLabel,
  className,
}) => {
  return (
    <div className={classNames(classes.table_main, className)}>
      <div className={classes.table_main_left}>
        <div className={classes.table_main_left_rounds}>{firstLabel}</div>
        <div className={classes.table_main_left_winner}>{secondLabel}</div>
      </div>
      <div className={classes.table_main_right}>
        <div className={classes.table_main_right_user}>{thirdLabel}</div>
        <div className={classes.table_main_right_house}>{fourthLabel}</div>
      </div>
    </div>
  );
};

export default TableLabels;
