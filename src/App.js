import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./pages/Main";
import FactsViewer from "./components/FactsViewer";
import FactsInSaved from "./components/FactsInSaved";
import ErrorPage from "./pages/ErrorPage";

import { JokesProvider } from "./context/JokesContext";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <BrowserRouter>
      <JokesProvider>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/facts-viewer" exact element={<FactsViewer />} />
            <Route path="/facts-in-saved" exact element={<FactsInSaved />} />
            <Route path="*" exact element={<ErrorPage />} />
          </Routes>
        </UserProvider>
      </JokesProvider>
    </BrowserRouter>
  );
}

export default App;
