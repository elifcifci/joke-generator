import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import "antd/dist/antd.css";

import { Button, Space, Typography, Divider, Empty } from "antd";
const { Title } = Typography;

const FactsInSaved = () => {
  const { factsInSaved, deleteFactsInBasketOrRemoveFromSavedFact } =
    useContext(FactsContext);

  const renderJokeList = () => {
    return factsInSaved?.map((joke, index) => {
      return (
        <li key={index}>
          <Space size="large">
            <p>{joke.value}</p>
            <Button
              danger
              onClick={() =>
                deleteFactsInBasketOrRemoveFromSavedFact(index, "delete")
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
      {factsInSaved.length == 0 && (
        <Empty
          image="https://i.pinimg.com/originals/21/83/70/2183700c5c69adaae4ef9c5e1ea400ad.gif"
          imageStyle={{
            height: 240,
          }}
          description={
            <span>
              You haven't added any Chuck Norris facts to your basket yet
            </span>
          }
        ></Empty>
      )}
    </>
  );
};

export default FactsInSaved;
