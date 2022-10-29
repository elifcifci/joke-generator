import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";

const JokeBasket = () => {
  const { jokesInBasket, saveJokes, removeJokesBasketItem } =
    useContext(JokesContext);

  const renderJokeList = () => {
    return jokesInBasket?.map((joke, index) => {
      return (
        <li key={index}>
          <p>{joke.value}</p>
          <button onClick={() => saveJokes(joke)}>Save</button>
          <button onClick={() => removeJokesBasketItem(index)}>Remove</button>
        </li>
      );
    });
  };
  return (
    <>
      <h1>Jokes in Your Basket</h1>
      <ul>{renderJokeList()}</ul>
    </>
  );
};

export default JokeBasket;
