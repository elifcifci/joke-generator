import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import Filter from "../../components/Filter";
import style from "./style.module.css";
import "antd/dist/antd.css";
import { Button, message } from "antd";

const JokeViewer = () => {
  const { facts, openNextFact, addInBasketOrSavedFacts } =
    useContext(FactsContext);

  const success = () => {
    message.success("The fact is in the basket.", 0.6);
  };

  const handleClick = (fact, targetPlace) => {
    addInBasketOrSavedFacts(fact, targetPlace);
    success();
  };
  return (
    <div className={style.factsContainer}>
      <img
        className={style.backgroundImage}
        src="./images/chuck-norris-Evgeny-Yurichev.png"
      />
      <section id={style.factsSection} className={style.factsSection}>
        <div className={style.factCardContainer}>
          <div className={style.cardHeader}>
            <h2 className={style.factsTitle}>Categories: </h2>
            <Filter />
          </div>
          <div className={style.factsCard}>
            <p className={style.factsText}>{facts.value}</p>
          </div>
        </div>
      </section>

      <section className={style.factsButtonContainer}>
        <Button className={style.nextButton} onClick={openNextFact}>
          Next
        </Button>
        <Button
          className={style.saveButton}
          onClick={() => handleClick(facts, "toBasket")}
        >
          Basket
        </Button>
      </section>
    </div>
  );
};

export default JokeViewer;
