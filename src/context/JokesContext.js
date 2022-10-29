import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const JokesContext = createContext();

const initialStateTemplate = { id: "", category: "", value: "" };
const baseUrl = "https://api.chucknorris.io/jokes/";

export const JokesProvider = ({ children }) => {
  const [jokeCategories, setJokeCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [randomJoke, setRandomJoke] = useState(initialStateTemplate);
  const [categorizedJoke, setCategorizedJoke] = useState(initialStateTemplate);
  const [jokesInBasket, setJokesInBasket] = useState([]);
  const [jokesInSaved, setJokesInSaved] = useState([]);

  useEffect(() => {
    openNextRandomJoke();

    //take categories in the API
    axios.get(`${baseUrl}categories`).then((response) => {
      setJokeCategories(response.data);
    });

    localStorage.getItem("saved-jokes") !== null &&
      setJokesInSaved([...JSON.parse(localStorage.getItem("saved-jokes"))]);
  }, []);

  useEffect(() => {
    selectedCategory && openNextCategorizedJoke();
  }, [selectedCategory]);

  useEffect(() => {
    jokesInSaved.length !== 0 &&
      localStorage.setItem("saved-jokes", JSON.stringify(jokesInSaved));
  }, [jokesInSaved]);

  const updateSelectedCategory = (event) => {
    event.target.value !== "default" && setSelectedCategory(event.target.value);
  };

  const openNextCategorizedJoke = () => {
    axios
      .get(`${baseUrl}random?category=${selectedCategory}`)
      .then((response) => {
        setCategorizedJoke({
          id: response.data.id,
          value: response.data.value,
          category: response.data.categories[0],
        });
      });
  };

  const openNextRandomJoke = () => {
    axios.get(`${baseUrl}random`).then((response) => {
      setRandomJoke({
        id: response.data.id,
        value: response.data.value,
        category: "random",
      });
    });
  };

  // When we want to save any joke, we check with this function if this joke is one of the ones we saved before.
  const checkIsSameJoke = (id, targetPlace) => {
    let haveSameJokeInBasket = false;
    let haveSameJokeInSaved = false;

    if (targetPlace === "toBasket") {
      jokesInBasket.forEach((item) => {
        if (item.id === id) {
          haveSameJokeInBasket = true;
          return;
        }
      });
    }
    if (targetPlace === "toBasket" || targetPlace === "toSaved") {
      jokesInSaved.forEach((item) => {
        if (item.id === id) {
          haveSameJokeInSaved = true;
          return;
        }
      });
    }

    const result = {
      haveSameJokeInBasket: haveSameJokeInBasket,
      haveSameJokeInSaved: haveSameJokeInSaved,
    };
    return result;
  };

  const addInBasketOrSavedJokes = (joke, targetPlace) => {
    const isSameJoke = checkIsSameJoke(joke.id, targetPlace);

    // Users can not add the joke from randomJoke or categorizedJoke to jokeBasket, if jokeBasket and jokeSaved have the same joke.
    // Users can not add the joke from jokeBasket to jokeSaved, if jokeSaved has the same joke.
    targetPlace === "toBasket"
      ? isSameJoke.haveSameJokeInBasket === false &&
        isSameJoke.haveSameJokeInSaved === false &&
        setJokesInBasket([...jokesInBasket, joke])
      : isSameJoke.haveSameJokeInSaved === false &&
        setJokesInSaved([...jokesInSaved, joke]);
  };

  const deleteJokesInBasketOrRemoveFromSavedJokes = (index, action) => {
    action === "delete"
      ? setJokesInSaved([
          ...jokesInSaved.slice(0, index),
          ...jokesInSaved.slice(index + 1, jokesInSaved.length),
        ])
      : setJokesInBasket([
          ...jokesInBasket.slice(0, index),
          ...jokesInBasket.slice(index + 1, jokesInBasket.length),
        ]);
  };

  const values = {
    jokeCategories,
    categorizedJoke,
    randomJoke,
    jokesInBasket,
    jokesInSaved,
    deleteJokesInBasketOrRemoveFromSavedJokes,
    addInBasketOrSavedJokes,
    updateSelectedCategory,
    openNextCategorizedJoke,
    openNextRandomJoke,
  };

  return (
    <JokesContext.Provider value={values}>{children}</JokesContext.Provider>
  );
};

export default JokesContext;
