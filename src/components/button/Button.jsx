import classNames from "classnames";
import React from "react";
import classes from "./Button.module.scss";

const Button = ({ children, className, ...props }) => {
  return (
    <button className={classNames(classes.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
