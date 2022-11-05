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

  const handleClick = (joke, targetPlace) => {
    addInBasketOrSavedFacts(joke, targetPlace);
    success();
  };

  return (
    <>
      {factsInBasket?.map((fact, index) => {
        return (
          <li className={style.factsInBasketListItem} key={index}>
            <p className={style.factsInBasketText}>{fact.value}</p>
            <div className={style.factsButtonContainer}>
              <Button
                className={`${style.saveButton} ${style.buttons}`}
                onClick={() => handleClick(fact, "toSaved")}
              >
                Save
              </Button>
              <Button
                className={`${style.removeButton} ${style.buttons}`}
                onClick={() =>
                  deleteFactsInBasketOrRemoveFromSavedFact(index, "remove")
                }
              >
                Remove
              </Button>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default FactsList;
