import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import style from "./style.module.css";

import FactsList from "./FactsList";
import EmptyCardRenderer from "../../components/EmptyCardRenderer";

const FactsInBasket = () => {
  const { factsInBasket } = useContext(FactsContext);

  return (
    <div className={style.factsContainer}>
      <img className={style.backgroundImage} src="./images/chuck-norris.png" />

      <ul className={style.factsInBasketList}>
        <FactsList />
      </ul>

      {factsInBasket.length == 0 && (
        <EmptyCardRenderer text="You haven't added any Chuck Norris facts to your basket yet" />
      )}
    </div>
  );
};

export default FactsInBasket;
