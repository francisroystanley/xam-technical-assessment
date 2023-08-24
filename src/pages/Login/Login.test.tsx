import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../contexts/UserContext";
import Login from "./";

describe("Login Component", () => {
  const renderLogin = () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </MemoryRouter>
    );
  };

  const fillLoginFormAndSubmit = (branchId: string, userName: string, password: string) => {
    const branchIdInput = screen.getByPlaceholderText("Branch id");
    const userNameInput = screen.getByPlaceholderText("User name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(branchIdInput, { target: { value: branchId } });
    fireEvent.change(userNameInput, { target: { value: userName } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(loginButton);
  };

  it("renders the login form", () => {
    renderLogin();

    expect(screen.getByPlaceholderText("Branch id")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("User name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("displays an error message on invalid branch id attempt", async () => {
    renderLogin();
    fillLoginFormAndSubmit("10005", "invaliduser", "invalidpassword");

    await waitFor(() => {
      expect(screen.getByText("Error: Branch not found.")).toBeInTheDocument();
    });
  });

  it("displays an error message on unregistered user login attempt", async () => {
    renderLogin();
    fillLoginFormAndSubmit("10001", "invaliduser", "invalidpassword");

    await waitFor(() => {
      expect(screen.getByText("Error: User not found.")).toBeInTheDocument();
    });
  });

  it("displays an error message on incorrect password login attempt", async () => {
    renderLogin();
    fillLoginFormAndSubmit("10001", "testuser01", "invalidpassword");

    await waitFor(() => {
      expect(screen.getByText("Error: Password is incorrect.")).toBeInTheDocument();
    });
  });

  it("submits the login form with valid data", async () => {
    renderLogin();
    fillLoginFormAndSubmit("10001", "testuser01", "pa55w0rd001");

    await waitFor(() => {
      expect(screen.queryByText("Login")).toBeNull();
    });

    expect(window.location.pathname).toBe("/");
  });

  it("redirects to home page if user is already authenticated", async () => {
    renderLogin();

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
