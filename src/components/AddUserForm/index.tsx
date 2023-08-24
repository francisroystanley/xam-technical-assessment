import { useUserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

import classes from "./AddUserForm.module.css";

const AddUserForm = () => {
  const { formSubmitted, formValue, getClassName, handleChange, hasError, isSubmitted, resetForm } = useForm({
    branchId: "",
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
    password: ""
  });
  const { addUser } = useUserContext();

  const handleAdd = () => {
    formSubmitted();

    if (hasError()) return;

    const newUser = { ...formValue, branchId: +formValue.branchId };

    addUser(newUser);
    resetForm();
  };

  return (
    <form className={`${classes.form} ${isSubmitted ? "is-submitted" : ""}`}>
      <input
        className={getClassName("branchId")}
        type="text"
        name="branchId"
        placeholder="Branch ID"
        value={formValue.branchId}
        onChange={handleChange}
      />
      <input
        className={getClassName("userName")}
        type="text"
        name="userName"
        placeholder="Username"
        value={formValue.userName}
        onChange={handleChange}
      />
      <input
        className={getClassName("firstName")}
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formValue.firstName}
        onChange={handleChange}
      />
      <input
        className={getClassName("middleName")}
        type="text"
        name="middleName"
        placeholder="Middle Name"
        value={formValue.middleName}
        onChange={handleChange}
      />
      <input
        className={getClassName("lastName")}
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formValue.lastName}
        onChange={handleChange}
      />
      <input
        className={getClassName("position")}
        type="text"
        name="position"
        placeholder="Position"
        value={formValue.position}
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
      <div className={classes.actions}>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
        <button className={classes.add} type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
