import { useUserContext } from "../../contexts/UserContext";

import classes from "./UserTable.module.css";

const UserTable = () => {
  const { removeUser, users } = useUserContext();

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Branch ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.branchId}</td>
              <td>{user.userName}</td>
              <td>{user.fullName}</td>
              <td>{user.position}</td>
              <td>
                <button className={classes.remove} onClick={() => removeUser(user.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
