import React from "react";
import style from "./style.module.css";

//Ant Design
import "antd/dist/antd.css";
import { Empty } from "antd";

const EmptyCardRenderer = ({ text }) => {
  return (
    <Empty
      className={style.emptyCardContainer}
      image="https://media1.giphy.com/media/Lx8lyPHGfdNjq/giphy.gif?cid=ecf05e47149eboq1wdzk0t977bfcj1vi4lus2okothxg1o54&rid=giphy.gif&ct=g"
      description={<span className={style.emptyCardText}>{text}</span>}
    ></Empty>
  );
};

export default EmptyCardRenderer;
