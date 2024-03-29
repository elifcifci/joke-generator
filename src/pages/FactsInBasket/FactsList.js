import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import { Button, message } from "antd";
import style from "./style.module.css";

const FactsList = () => {
  const {
    factsInBasket,
    addInBasketOrSavedFacts,
    deleteFactsInBasketOrRemoveFromSavedFact,
  } = useContext(FactsContext);

  const success = () => {
    message.success("This facts is saved", 0.6);
  };

  const handleClick = (index, joke, targetPlace) => {
    addInBasketOrSavedFacts(joke, targetPlace);
    success();
    deleteFactsInBasketOrRemoveFromSavedFact(index, "remove");
  };

  return (
    <>
      {factsInBasket?.map((fact, index) => {
        return (
          <li className={style.factsInBasketListItem} key={index}>
            <p className={style.factsInBasketText}>{fact.value}</p>
            <div className={style.factsButtonContainer}>
              <Button
                className={`${style.removeButton} ${style.buttons}`}
                onClick={() =>
                  deleteFactsInBasketOrRemoveFromSavedFact(index, "remove")
                }
              >
                Remove
              </Button>
              <Button
                className={`${style.saveButton} ${style.buttons}`}
                onClick={() => handleClick(index, fact, "toSaved")}
              >
                Save
              </Button>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default FactsList;
