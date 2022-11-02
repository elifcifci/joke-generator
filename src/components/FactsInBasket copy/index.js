import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import { Button, Space, message, Empty } from "antd";

const FactsInBasket = () => {
  const {
    factsInSaved,
    factsInBasket,
    addInBasketOrSavedFacts,
    deleteFactsInBasketOrRemoveFromSavedFact,
  } = useContext(FactsContext);

  const success = () => {
    message.success("This facts is saved");
  };

  const handleClick = (joke, targetPlace) => {
    addInBasketOrSavedFacts(joke, targetPlace);
    success();
  };

  const renderFactList = () => {
    return factsInBasket?.map((fact, index) => {
      return (
        <li key={index}>
          <Space>
            <p>{fact.value}</p>
            <Button onClick={() => handleClick(fact, "toSaved")}>Save</Button>
            <Button
              danger
              onClick={() =>
                deleteFactsInBasketOrRemoveFromSavedFact(index, "remove")
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
      <ul>{renderFactList()}</ul>
      {factsInBasket.length == 0 && (
        <Empty
          image="https://media1.giphy.com/media/Lx8lyPHGfdNjq/giphy.gif?cid=ecf05e47149eboq1wdzk0t977bfcj1vi4lus2okothxg1o54&rid=giphy.gif&ct=g"
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

export default FactsInBasket;
