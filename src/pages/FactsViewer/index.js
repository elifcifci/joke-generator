import React, { useContext, useState } from "react";
import FactsContext from "../../context/FactsContext";
import Filter from "../../components/Filter";
import ModelRenderer from "../../components/ModelRenderer";
import style from "./style.module.css";
import "antd/dist/antd.css";
import { Button, message } from "antd";

const JokeViewer = () => {
  const { facts, openNextFact, addInBasketOrSavedFacts } =
    useContext(FactsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const success = () => {
    message.success("This is a success message");
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
        <div className={style.innerSectionContainer}>
          <h2 className={style.factsTitle}>Facts </h2>
          <Filter />
          <div className={style.factsCard}>
            <p className={style.factsText}>{facts.value}</p>
            <div className={style.factsButtonContainer}>
              <Button className={style.nextButton} onClick={openNextFact}>
                Next
              </Button>
              <Button
                className={style.saveButton}
                onClick={() => handleClick(facts, "toBasket")}
              >
                Basket
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={style.openBasketFactsButtonSection}>
        <Button
          draggable={true}
          className={style.draggableButton}
          onClick={showModal}
        >
          Open Your Basket
        </Button>
        <ModelRenderer
          modalTitle="Facts in Your Basket"
          componentName="FactsInBasket"
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </section>
    </div>
  );
};

export default JokeViewer;
