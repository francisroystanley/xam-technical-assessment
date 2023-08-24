import { FC, createContext, useCallback, useContext, useEffect, useState } from "react";

import { LoginPayload, NewUser, SafeUser, User, UserContextType, UserProviderProps } from "../utils/types";
import { users as users_data } from "../utils/users_data";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const localStorageUserKey = "user";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastUserId, setLastUserId] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<SafeUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (newUser: NewUser) => {
    const user = { ...newUser, id: lastUserId + 1, fullName: getFullName(newUser) };

    setUsers(prevState => [...prevState, user]);
    setLastUserId(prevState => prevState + 1);
  };

  const authenticate = useCallback((data: SafeUser) => {
    setLocalStorage(data);
    setLoggedInUser(data);
    setIsAuthenticated(true);
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem(localStorageUserKey);
  };

  const getFullName = (user: NewUser) => {
    const middleInitial = user.middleName[0];

    return `${user.firstName} ${middleInitial}. ${user.lastName}`;
  };

  const loadUsers = useCallback(() => {
    const users = users_data.map((user, i) => {
      const newUser = { ...user } as User;

      newUser.fullName = getFullName(user);
      newUser.id = i + 1;

      return newUser;
    });

    setLastUserId(users.length);
    setUsers(users);
  }, []);

  const login = ({ branchId, password, userName }: LoginPayload) => {
    const user = users.find(u => u.branchId === +branchId);

    if (!user) return setLoginError("Error: Branch not found.");

    if (user.userName !== userName) return setLoginError("Error: User not found.");

    if (user.password !== password) return setLoginError("Error: Password is incorrect.");

    const { password: pw, ...safeUser } = user;

    setLoginError(null);
    authenticate(safeUser);
  };

  const logout = () => {
    clearLocalStorage();
    setLoggedInUser(null);
    setIsAuthenticated(false);
  };

  const removeUser = (userId: User["id"]) => {
    setUsers(users.filter(user => user.id !== userId));

    if (loggedInUser && loggedInUser.id === userId) logout();
  };

  const setLocalStorage = (data: SafeUser) => {
    localStorage.setItem(localStorageUserKey, JSON.stringify(data));
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const user: SafeUser = JSON.parse(localStorage.getItem(localStorageUserKey)!);

    if (user) authenticate(user);
  }, [authenticate]);

  return (
    <UserContext.Provider
      value={{ isAuthenticated, loggedInUser, loginError, users, addUser, login, logout, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error("useUserContext must be used within a UserProvider");

  return context;
};
