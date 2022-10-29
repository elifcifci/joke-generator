import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
const Cards = () => {
  const {
    randomJoke,
    categorizedJoke,
    openNextCategorizedJoke,
    openNextRandomJoke,
    addInBasketOrSavedJokes,
  } = useContext(JokesContext);

  return (
    <div>
      <section>
        <h2>Random jokes: </h2>
        <div>{randomJoke.value}</div>
        <button onClick={openNextRandomJoke}>Next joke</button>
        <button onClick={() => addInBasketOrSavedJokes(randomJoke, "toBasket")}>
          Joke Basket
        </button>
      </section>
      <section>
        <h2>jokes In Category: </h2>
        <div>{categorizedJoke.value}</div>
        <button onClick={openNextCategorizedJoke}>Next joke</button>
        <button
          onClick={() => addInBasketOrSavedJokes(categorizedJoke, "toBasket")}
        >
          Joke Basket
        </button>
      </section>
    </div>
  );
};

export default Cards;
