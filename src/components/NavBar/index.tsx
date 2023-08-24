import { useUserContext } from "../../contexts/UserContext";

import classes from "./NavBar.module.css";

const NavBar = () => {
  const { loggedInUser, logout } = useUserContext();

  return (
    <div className={classes.nav}>
      <h2>{loggedInUser?.userName}</h2>
      <button className={`btn-light-blue ${classes.logout}`} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;
