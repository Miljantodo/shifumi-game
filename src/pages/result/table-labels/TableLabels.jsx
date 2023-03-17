import classes from "./TableLabels.module.scss";

const TableLabels = ({ firstLabel, secondLabel, thirdLabel, fourthLabel }) => {
  return (
    <div className={classes.table_main}>
      <div className={classes.table_main_labels}>
        <div>{firstLabel}</div>
        <div>{secondLabel}</div>
      </div>
      <div className={classes.table_main_labels}>
        <div>{thirdLabel}</div>
        <div>{fourthLabel}</div>
      </div>
    </div>
  );
};

export default TableLabels;
