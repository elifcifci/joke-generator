import React, { useContext } from "react";
import FactsContext from "../../context/FactsContext";
import UserContext from "../../context/UserContext";
import "antd/dist/antd.css";
import style from "./style.module.css";

import { CloseOutlined } from "@ant-design/icons";
import { Space } from "antd";

const FactsInSaved = () => {
  const { factsInSaved, deleteFactsInBasketOrRemoveFromSavedFact } =
    useContext(FactsContext);
  const { currentUser } = useContext(UserContext);

  const renderJokeList = () => {
    return factsInSaved?.map((joke, index) => {
      return (
        <li className={style.factsInSavedListItem} key={index}>
          <Space size="large">
            <p>{joke.value}</p>
            <CloseOutlined
              onClick={() =>
                deleteFactsInBasketOrRemoveFromSavedFact(index, "delete")
              }
              style={{
                color: "#bf9e8f",
                fontSize: 20,
              }}
            />
          </Space>
        </li>
      );
    });
  };

  return (
    <div className={style.factsInSavedContainer}>
      <img className={style.backgroundImage} src="./images/img-4.jpg" alt="" />
      <ul className={style.factsInSavedList}>{renderJokeList()}</ul>
      {factsInSaved.length === 0 && (
        <div className={style.noSavedFactContainer}>
          <p className={style.noSavedFact}>
            Hey, {currentUser.username}! You haven't added any Chuck Norris
            facts to your basket yet
          </p>
        </div>
      )}
    </div>
  );
};

export default FactsInSaved;
