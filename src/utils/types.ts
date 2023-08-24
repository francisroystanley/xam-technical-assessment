export type NewUser = {
  branchId: number;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
};

export type User = NewUser & {
  id: number;
  fullName: string;
};

export type SafeUser = Omit<User, "password">;

export type LoginPayload = {
  branchId: string;
  userName: string;
  password: string;
};

export type UserContextType = {
  isAuthenticated: boolean;
  loggedInUser: SafeUser | null;
  loginError: string | null;
  users: User[];
  addUser: (newUser: NewUser) => void;
  login: (data: LoginPayload) => void;
  logout: () => void;
  removeUser: (userId: User["id"]) => void;
};

export type UserProviderProps = {
  children?: React.ReactNode;
};
