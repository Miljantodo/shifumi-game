import React from "react";
import classes from "./Header.module.scss";

const Header = ({ children }) => {
  return (
    <div className={classes.header}>
      <div className={classes.header_text}>{children}</div>
    </div>
  );
};

export default Header;
