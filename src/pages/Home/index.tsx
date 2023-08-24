import { Navigate } from "react-router-dom";

import { AddUserForm, NavBar, UserTable } from "../../components";
import { useUserContext } from "../../contexts/UserContext";

import classes from "./Home.module.css";

const Home = () => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) return <Navigate replace to="/login" />;

  return (
    <div className={classes.container}>
      <NavBar />
      <main className={classes.main}>
        <AddUserForm />
        <UserTable />
      </main>
    </div>
  );
};

export default Home;
