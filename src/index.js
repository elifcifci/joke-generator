import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FactsProvider } from "./context/FactsContext";
import { UserProvider } from "./context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FactsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </FactsProvider>
  </React.StrictMode>
);
