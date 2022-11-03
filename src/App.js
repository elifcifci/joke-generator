import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./pages/Main";
import FactsViewer from "./pages/FactsViewer";
import FactsInSaved from "./pages/FactsInSaved";
import ErrorPage from "./pages/ErrorPage";

import UserContext from "./context/UserContext";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="*" exact element={<ErrorPage />} />

        {isLoggedIn && (
          <>
            <Route path="/facts-viewer" exact element={<FactsViewer />} />
            <Route path="/facts-in-saved" exact element={<FactsInSaved />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
