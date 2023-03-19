// styles
import classes from "./layout.module.scss";

function Layout({ children, ...props }) {
  return (
    <div className={classes.container} {...props}>
      {children}
    </div>
  );
}

export default Layout;
