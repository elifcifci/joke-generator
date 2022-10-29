import React from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import JokeBasket from "./components/Cards/JokeBasket";

import { JokesProvider } from "./context/JokesContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <JokesProvider>
      <UserProvider>
        <Header />
        <Filter />
        <Cards />
        <JokeBasket />
      </UserProvider>
    </JokesProvider>
  );
}

export default App;
