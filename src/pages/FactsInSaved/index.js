import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import "antd/dist/antd.min.css";
import style from "./style.module.css";
import EmptyCardRenderer from "../../components/EmptyCardRenderer";
import { CloseOutlined } from "@ant-design/icons";

const FactsInSaved = () => {
  const { factsInSaved, deleteFactsInBasketOrRemoveFromSavedFact } =
    useContext(FactsContext);

  const renderJokeList = () => {
    return factsInSaved?.map((joke, index) => {
      return (
        <li className={style.factsInSavedListItem} key={index}>
          <p className={style.factsInSavedText}>{joke.value}</p>
          <CloseOutlined
            onClick={() =>
              deleteFactsInBasketOrRemoveFromSavedFact(index, "delete")
            }
            className={style.closeIcon}
          />
        </li>
      );
    });
  };

  return (
    <div className={style.factsContainer}>
      <img
        className={style.backgroundImage}
        src="./images/chuck-norris-Evgeny-Yurichev.png"
        alt="background"
      />
      <ul className={style.factsInSavedList}>{renderJokeList()}</ul>
      {factsInSaved.length === 0 && (
        <EmptyCardRenderer
          text="You haven't added any Chuck Norris
          facts to your saved facts yet!"
        />
      )}
    </div>
  );
};

export default FactsInSaved;
