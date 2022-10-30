import React, { useContext } from "react";
import JokesContext from "../../context/JokesContext";
import "antd/dist/antd.css";

import { Button, Space, Typography, Divider } from "antd";
const { Title } = Typography;

const FactsInSaved = () => {
  const { jokesInSaved, deleteJokesInBasketOrRemoveFromSavedJokes } =
    useContext(JokesContext);

  const renderJokeList = () => {
    return jokesInSaved?.map((joke, index) => {
      return (
        <li key={index}>
          <Space size="large">
            <p>{joke.value}</p>
            <Button
              danger
              onClick={() =>
                deleteJokesInBasketOrRemoveFromSavedJokes(index, "delete")
              }
            >
              Delete
            </Button>
          </Space>
        </li>
      );
    });
  };
  return (
    <>
      <Divider orientation="left">
        <Title level={1}>Jokes You Saved</Title>
      </Divider>
      <ul>{renderJokeList()}</ul>
    </>
  );
};

export default FactsInSaved;
