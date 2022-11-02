import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./pages/Main";
import FactsViewer from "./pages/FactsViewer";
import FactsInSaved from "./components/FactsInSaved";
import ErrorPage from "./pages/ErrorPage";

import { FactsProvider } from "./context/FactsContext";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <BrowserRouter>
      <FactsProvider>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/facts-viewer" exact element={<FactsViewer />} />
            <Route path="/facts-in-saved" exact element={<FactsInSaved />} />
            <Route path="*" exact element={<ErrorPage />} />
          </Routes>
        </UserProvider>
      </FactsProvider>
    </BrowserRouter>
  );
}

export default App;
