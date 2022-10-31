import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
import { Button, Space, message } from "antd";

const FactsInBasket = () => {
  const {
    jokesInBasket,
    addInBasketOrSavedJokes,
    deleteJokesInBasketOrRemoveFromSavedJokes,
  } = useContext(JokesContext);

  const success = () => {
    message.success("This facts is saved");
  };

  const handleClick = (joke, targetPlace) => {
    addInBasketOrSavedJokes(joke, targetPlace);
    success();
  };

  const renderJokeList = () => {
    return jokesInBasket?.map((joke, index) => {
      return (
        <li key={index}>
          <Space>
            <p>{joke.value}</p>
            <Button onClick={() => handleClick(joke, "toSaved")}>Save</Button>
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
      {jokesInBasket.length == 0 && (
        <p>You haven't added any Chuck Norris facts to your basket yet</p>
      )}
    </>
  );
};

export default FactsInBasket;
