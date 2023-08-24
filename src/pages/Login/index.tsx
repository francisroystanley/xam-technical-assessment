import { Navigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";
import { Alert } from "../../components";
import useForm from "../../hooks/useForm";

import classes from "./Login.module.css";

const Login = () => {
  const { formSubmitted, formValue, getClassName, handleChange, hasError, isSubmitted } = useForm({
    branchId: "",
    userName: "",
    password: ""
  });
  const { login, loginError, isAuthenticated } = useUserContext();

  const handleSubmit = () => {
    formSubmitted();

    if (hasError()) return;

    login(formValue);
  };

  if (isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className={classes.container}>
      <form className={`${classes.form} ${isSubmitted ? "is-submitted" : ""}`}>
        <h2>Login</h2>
        <input
          className={getClassName("branchId")}
          type="text"
          name="branchId"
          placeholder="Branch id"
          value={formValue.branchId}
          onChange={handleChange}
        />
        <input
          className={getClassName("userName")}
          type="text"
          name="userName"
          placeholder="User name"
          value={formValue.userName}
          onChange={handleChange}
        />
        <input
          className={getClassName("password")}
          type="password"
          name="password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
        />
        <button className="btn-light-blue" type="button" onClick={handleSubmit}>
          Login
        </button>
        {loginError && <Alert message={loginError} />}
      </form>
    </div>
  );
};

export default Login;
