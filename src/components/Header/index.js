import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
const Header = () => {
  const { randomJoke } = useContext(JokesContext);
  return <div>hello</div>;
};

export default Header;
