import React from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import { JokesProvider } from "./context/JokesContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <JokesProvider>
      <UserProvider>
        <Header />
        <Filter />
        <SignUp />
        <SignIn />
      </UserProvider>
    </JokesProvider>
  );
}

export default App;
