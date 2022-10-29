import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
const Cards = () => {
  const {
    randomJokeKnowledge,
    jokeInCategory,
    openNextJokeInCategory,
    openNextRandomJoke,
    addInJokesBasket,
  } = useContext(JokesContext);
  return (
    <div>
      <section>
        <h2>Random jokes: </h2>
        <div>{randomJokeKnowledge.value}</div>
        <button onClick={openNextRandomJoke}>Next joke</button>
        <button
          onClick={() => addInJokesBasket("random", randomJokeKnowledge.value)}
        >
          Joke Basket
        </button>
      </section>
      <section>
        <h2>jokes In Category: </h2>
        <div>{jokeInCategory.value}</div>
        <button onClick={openNextJokeInCategory}>Next joke</button>
        <button
          onClick={() =>
            addInJokesBasket(jokeInCategory.category, jokeInCategory.value)
          }
        >
          Joke Basket
        </button>
      </section>
    </div>
  );
};

export default Cards;
