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
        <div className={classes.table_main_left_first}>{firstLabel}</div>
        <div className={classes.table_main_left_second}>{secondLabel}</div>
      </div>
      <div className={classes.table_main_right}>
        <div className={classes.table_main_right_third}>{thirdLabel}</div>
        <div className={classes.table_main_right_fourth}>{fourthLabel}</div>
      </div>
    </div>
  );
};

export default TableLabels;
