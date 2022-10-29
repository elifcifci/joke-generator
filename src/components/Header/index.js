import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
const Header = () => {
  const { randomJokeKnowledge, jokeInCategory } = useContext(JokesContext);
  return (
    <div>
      hello: {randomJokeKnowledge.value}
      <div>{jokeInCategory.value}</div>
    </div>
  );
};

export default Header;
