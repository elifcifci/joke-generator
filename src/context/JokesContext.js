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
  const [favoriteJokes, setFavoriteJokes] = useState([]);

  useEffect(() => {
    openNextRandomJoke();

    //take categories in the API
    axios.get(`${baseUrl}categories`).then((response) => {
      setJokeCategories(response.data);
    });

    localStorage.getItem("favorites") !== null &&
      setFavoriteJokes([...JSON.parse(localStorage.getItem("favorites"))]);
  }, []);

  useEffect(() => {
    openNextJokeInCategory();
  }, [selectedCategory]);

  useEffect(() => {
    favoriteJokes.length !== 0 &&
      localStorage.setItem("favorites", JSON.stringify(favoriteJokes));
    console.log("favoriteJokes: ", favoriteJokes);
  }, [favoriteJokes]);

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
  const addInFavoriteJokes = (category, joke) => {
    setFavoriteJokes([...favoriteJokes, { category: category, value: joke }]);
  };
  // const removeFromFavoriteJokes = (category, joke) => {
  //   let removedJoke =
  //   setFavoriteJokes([...favoriteJokes, { category: category, value: joke }]);
  // };

  const values = {
    randomJokeKnowledge,
    jokeCategories,
    jokeInCategory,
    favoriteJokes,
    addInFavoriteJokes,
    updateSelectedCategory,
    openNextJokeInCategory,
    openNextRandomJoke,
  };

  return (
    <JokesContext.Provider value={values}>{children}</JokesContext.Provider>
  );
};

export default JokesContext;
