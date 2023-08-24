import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import { Home, Login } from "./pages";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
