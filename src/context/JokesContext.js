import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const JokesContext = createContext();

const initialStateTemplate = { id: "", value: "" };
const baseUrl = "https://api.chucknorris.io/jokes/";

export const JokesProvider = ({ children }) => {
  const [randomJokeKnowledge, setRandomJokeKnowledge] =
    useState(initialStateTemplate);
  const [jokeCategories, setJokeCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [jokeInCategory, setJokeInCategory] = useState(initialStateTemplate);
  const [savedJokes, setSavedJokes] = useState([]);
  const [jokesInBasket, setJokesInBasket] = useState([]);

  useEffect(() => {
    openNextRandomJoke();

    //take categories in the API
    axios.get(`${baseUrl}categories`).then((response) => {
      setJokeCategories(response.data);
    });

    localStorage.getItem("saved-jokes") !== null &&
      setSavedJokes([...JSON.parse(localStorage.getItem("saved-jokes"))]);
  }, []);

  useEffect(() => {
    selectedCategory && openNextJokeInCategory();
  }, [selectedCategory]);

  useEffect(() => {}, [jokesInBasket]);

  useEffect(() => {
    savedJokes.length !== 0 &&
      localStorage.setItem("saved-jokes", JSON.stringify(savedJokes));
    console.log("savedJokes", savedJokes);
  }, [savedJokes]);

  const updateSelectedCategory = (event) => {
    event.target.value !== "default" && setSelectedCategory(event.target.value);
  };

  const openNextJokeInCategory = () => {
    axios
      .get(`${baseUrl}random?category=${selectedCategory}`)
      .then((response) => {
        setJokeInCategory({
          id: response.data.id,
          value: response.data.value,
          category: response.data.categories[0],
        });
      });
  };

  const openNextRandomJoke = () => {
    axios.get(`${baseUrl}random`).then((response) => {
      setRandomJokeKnowledge({
        id: response.data.id,
        value: response.data.value,
      });
    });
  };

  const addInJokesBasket = (category, joke) => {
    setJokesInBasket([...jokesInBasket, { category: category, value: joke }]);
  };

  const saveJokes = (joke) => {
    setSavedJokes([...savedJokes, joke]);
  };

  const removeJokesBasketItem = (index) => {
    console.log(index);
    let temp = [...jokesInBasket];
    // selected joke = temp.slice(index, index + 1)
    setJokesInBasket([
      ...temp.slice(0, index),
      ...temp.slice(index + 1, temp.length),
    ]);
  };
  const deleteFromSavedJokes = (index) => {
    console.log(index);
    let temp = [...savedJokes];
    setSavedJokes([
      ...temp.slice(0, index),
      ...temp.slice(index + 1, temp.length),
    ]);
  };

  const values = {
    randomJokeKnowledge,
    jokeCategories,
    jokeInCategory,
    jokesInBasket,
    savedJokes,
    deleteFromSavedJokes,
    removeJokesBasketItem,
    saveJokes,
    addInJokesBasket,
    saveJokes,
    updateSelectedCategory,
    openNextJokeInCategory,
    openNextRandomJoke,
  };

  return (
    <JokesContext.Provider value={values}>{children}</JokesContext.Provider>
  );
};

export default JokesContext;
