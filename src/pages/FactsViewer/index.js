import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import CategoryList from "../../components/CategoryList";
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
            <CategoryList />
          </div>
          <div className={style.factsCard}>
            <p className={style.factsText}>{facts.value}</p>
          </div>
        </div>
      </section>

      <section className={style.factsButtonContainer}>
        <Button
          className={`${style.nextButton} ${style.buttons}`}
          onClick={openNextFact}
        >
          Next
        </Button>
        <Button
          className={`${style.saveButton} ${style.buttons}`}
          onClick={() => handleClick(facts, "toBasket")}
        >
          Basket
        </Button>
      </section>
    </div>
  );
};

export default JokeViewer;
