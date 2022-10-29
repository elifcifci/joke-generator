import React from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";

import { JokesProvider } from "./context/JokesContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <JokesProvider>
      <UserProvider>
        <Header />
        <Filter />
        <Cards />
      </UserProvider>
    </JokesProvider>
  );
}

export default App;
