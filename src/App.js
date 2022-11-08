import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Main from "./pages/Main";
import FactsViewer from "./pages/FactsViewer";
import FactsInSaved from "./pages/FactsInSaved";
import FactsInBasket from "./pages/FactsInBasket";
import ErrorPage from "./pages/ErrorPage";

import UserContext from "./context/UserContext";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />

        {isLoggedIn && (
          <>
            <Route path="/facts-viewer" exact element={<FactsViewer />} />
            <Route path="/facts-in-saved" exact element={<FactsInSaved />} />
            <Route path="/facts-in-basket" exact element={<FactsInBasket />} />
          </>
        )}
        <Route path="*" exact element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
