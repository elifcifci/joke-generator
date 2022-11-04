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
    message.success("This facts is saved", 0.6);
  };

  const handleClick = (joke, targetPlace) => {
    addInBasketOrSavedFacts(joke, targetPlace);
    success();
  };

  const renderFactList = () => {
    return factsInBasket?.map((fact, index) => {
      return (
        <li
          className={`${style.basketListItem} ${style.factCardContainer}`}
          key={index}
        >
          <p className={style.factsText}>{fact.value}</p>
          <div className={style.factsButtonContainer}>
            <Button
              className={style.saveButton}
              onClick={() => handleClick(fact, "toSaved")}
            >
              Save
            </Button>
            <Button
              className={style.removeButton}
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
    <div className={style.factsContainer}>
      <img className={style.backgroundImage} src="./images/chuck-norris.png" />
      <ul className={`${style.basketList} ${style.factsSection}`}>
        {renderFactList()}
      </ul>
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
    </div>
  );
};

export default FactsInBasket;
