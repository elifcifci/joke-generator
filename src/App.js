import React from "react";
import { JokesProvider } from "./context/JokesContext";
import Header from "./components/Header";

function App() {
  return (
    <JokesProvider>
      <Header />
    </JokesProvider>
  );
}

export default App;
