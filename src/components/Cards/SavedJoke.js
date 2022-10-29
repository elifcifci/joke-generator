import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";

const SavedJoke = () => {
  const { savedJokes, deleteFromSavedJokes } = useContext(JokesContext);

  const renderJokeList = () => {
    return savedJokes?.map((joke, index) => {
      return (
        <li key={index}>
          <p>{joke.value}</p>
          <button onClick={() => deleteFromSavedJokes(index)}>Delete</button>
        </li>
      );
    });
  };
  return (
    <>
      <h1>Jokes You Saved</h1>
      <ul>{renderJokeList()}</ul>
    </>
  );
};

export default SavedJoke;
