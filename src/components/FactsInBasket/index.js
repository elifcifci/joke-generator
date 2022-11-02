import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import { Button, message, Empty } from "antd";
import style from "./style.module.css";

const FactsInBasket = () => {
  const {
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
        <li className={style.basketListItem} key={index}>
          <p>{fact.value}</p>
          <div className={style.buttonContainer}>
            <Button onClick={() => handleClick(fact, "toSaved")}>Save</Button>
            <Button
              danger
              onClick={() =>
                deleteFactsInBasketOrRemoveFromSavedFact(index, "remove")
              }
            >
              Remove
            </Button>
          </div>
        </li>
      );
    });
  };
  return (
    <>
      <ul className={style.basketList}>{renderFactList()}</ul>
      {factsInBasket.length == 0 && (
        <Empty
          className={style.basketEmptyCard}
          image="https://media1.giphy.com/media/Lx8lyPHGfdNjq/giphy.gif?cid=ecf05e47149eboq1wdzk0t977bfcj1vi4lus2okothxg1o54&rid=giphy.gif&ct=g"
          imageStyle={{
            width: "100%",
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
