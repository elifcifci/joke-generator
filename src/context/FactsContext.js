import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const FactsContext = createContext();

const initialStateTemplate = { id: "", category: "", value: "" };
const baseUrl = "https://api.chucknorris.io/jokes/";

export const FactsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("random");
  const [facts, setFacts] = useState(initialStateTemplate);
  const [factsInBasket, setFactsInBasket] = useState([]);
  const [factsInSaved, setFactsInSaved] = useState([]);
  const [factCategories, setFactCategories] = useState([]);

  useEffect(() => {
    //take categories in the API
    axios.get(`${baseUrl}categories`).then((response) => {

      setFactCategories([
        "random",
        ...response.data.slice(0, response.data.length),
      ]);
    });

    localStorage.getItem("saved-facts") !== null &&
      setFactsInSaved([...JSON.parse(localStorage.getItem("saved-facts"))]);
  }, []);

  useEffect(() => {
    selectedCategory && openNextFact();
  }, [selectedCategory]);

  useEffect(() => {
    factsInSaved.length !== 0
      ? localStorage.setItem("saved-facts", JSON.stringify(factsInSaved))
      : factsInSaved.length === 0 && localStorage.removeItem("saved-facts");
  }, [factsInSaved]);

  const openNextFact = () => {
    const link =
      selectedCategory === "random"
        ? `random`
        : `random?category=${selectedCategory}`;

    axios.get(`${baseUrl}${link}`).then((response) => {
      setFacts({
        id: response.data.id,
        value: response.data.value,
        category: selectedCategory,
      });
    });
  };

  // When we want to save any joke, we check with this function if this joke is one of the ones we saved before.
  const checkIsSameFact = (id, targetPlace) => {
    let haveSameFactInBasket = false;
    let haveSameFactInSaved = false;

    if (targetPlace === "toBasket") {
      factsInBasket.forEach((item) => {
        if (item.id === id) {
          haveSameFactInBasket = true;
          return;
        }
      });
    }
    if (targetPlace === "toBasket" || targetPlace === "toSaved") {
      factsInSaved.forEach((item) => {
        if (item.id === id) {
          haveSameFactInSaved = true;
          return;
        }
      });
    }

    const result = {
      haveSameFactInBasket: haveSameFactInBasket,
      haveSameFactInSaved: haveSameFactInSaved,
    };
    return result;
  };

  const addInBasketOrSavedFacts = (fact, targetPlace) => {
    const isSameFact = checkIsSameFact(fact.id, targetPlace);

    // Users can not add the fact from randomJoke or categorizedJoke to factBasket, if factBasket and factSaved have the same fact.
    // Users can not add the fact from factBasket to factSaved, if factSaved has the same fact.
    if (
      targetPlace === "toBasket" &&
      isSameFact.haveSameFactInBasket === false &&
      isSameFact.haveSameFactInSaved === false
    ) {
      setFactsInBasket([...factsInBasket, fact]);
    } else if (isSameFact.haveSameFactInSaved === false) {
      setFactsInSaved([...factsInSaved, fact]);
    }
  };

  const deleteFactsInBasketOrRemoveFromSavedFact = (index, action) => {
    //if factsInBasket has only one item and we want to delete it, we  need to update localStore to clean the user's localStore.
    action === "delete"
      ? setFactsInSaved([
          ...factsInSaved.slice(0, index),
          ...factsInSaved.slice(index + 1, factsInSaved.length),
        ])
      : setFactsInBasket([
          ...factsInBasket.slice(0, index),
          ...factsInBasket.slice(index + 1, factsInBasket.length),
        ]);
  };

  const values = {
    factCategories,
    facts,
    factsInBasket,
    selectedCategory,
    factsInSaved,
    setFactsInSaved,
    setSelectedCategory,
    deleteFactsInBasketOrRemoveFromSavedFact,
    addInBasketOrSavedFacts,
    openNextFact,
  };

  return (
    <FactsContext.Provider value={values}>{children}</FactsContext.Provider>
  );
};

export default FactsContext;
