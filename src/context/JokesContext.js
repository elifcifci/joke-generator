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
      setJokeInCategory({
        id: response.data.id,
        value: response.data.value,
      });
    });
  }, [selectedCategory]);

  const updateSelectedCategory = (event) => {
    event.target.value !== "default" && setSelectedCategory(event.target.value);
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
