import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

const JokesContext = createContext();
const initialStateTemplate = { id: "", value: "" };

export const JokesProvider = ({ children }) => {
  const [randomJokeKnowledge, setRandomJokeKnowledge] =
    useState(initialStateTemplate);
  const [jokeCategories, setJokeCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [jokeInCategory, setJokeInCategory] = useState(initialStateTemplate);

  const baseUrl = "https://api.chucknorris.io/jokes/";

  useEffect(() => {
    axios.get(`${baseUrl}random`).then((response) => {
      setRandomJokeKnowledge({
        id: response.data.id,
        value: response.data.value,
      });
    });

    axios.get(`${baseUrl}categories`).then((response) => {
      setJokeCategories(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseUrl}random?${selectedCategory}`).then((response) => {
      console.log("jokeInCategory: ", response.data);
      setJokeInCategory({
        id: response.data.id,
        value: response.data.value,
      });
    });
  }, [selectedCategory]);

  const updateSelectedCategory = (event) => {
    const temporary = jokeCategories[event.id];
    setSelectedCategory(temporary);
  };

  const values = {
    randomJokeKnowledge,
    jokeCategories,
    jokeInCategory,
    updateSelectedCategory,
  };

  return (
    <JokesContext.Provider value={values}>{children}</JokesContext.Provider>
  );
};

export default JokesContext;
