import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
import { Button, Space } from "antd";

const FactsInBasket = () => {
  const {
    jokesInBasket,
    addInBasketOrSavedJokes,
    deleteJokesInBasketOrRemoveFromSavedJokes,
  } = useContext(JokesContext);

  const renderJokeList = () => {
    return jokesInBasket?.map((joke, index) => {
      return (
        <li key={index}>
          <Space>
            <p>{joke.value}</p>
            <Button onClick={() => addInBasketOrSavedJokes(joke, "toSaved")}>
              Save
            </Button>
            <Button
              danger
              onClick={() =>
                deleteJokesInBasketOrRemoveFromSavedJokes(index, "remove")
              }
            >
              Remove
            </Button>
          </Space>
        </li>
      );
    });
  };
  return (
    <>
      <ul>{renderJokeList()}</ul>
    </>
  );
};

export default FactsInBasket;
