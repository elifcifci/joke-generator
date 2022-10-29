import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";

const SavedJoke = () => {
  const { jokesInSaved, deleteJokesInBasketOrRemoveFromSavedJokes } =
    useContext(JokesContext);

  const renderJokeList = () => {
    return jokesInSaved?.map((joke, index) => {
      return (
        <li key={index}>
          <p>{joke.value}</p>
          <button
            onClick={() =>
              deleteJokesInBasketOrRemoveFromSavedJokes(index, "delete")
            }
          >
            Delete
          </button>
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
