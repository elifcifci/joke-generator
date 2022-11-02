import React from "react";
import style from "./style.module.css";
import { mainConstants } from "../../constants/mainConstans";

//Ant-design
import "antd/dist/antd.css";
import { Carousel } from "antd";

const Main = () => {
  const cardRenderer = () => {
    return mainConstants.map((constant) => {
      return (
        <section
          key={constant.id}
          id={style[constant.id]}
          className={style.sections}
        >
          <div className={style.sectionImageContainer}>
            <img
              className={style.chuckNorrisPictures}
              src={constant.imgSrc}
              alt={constant.imgAlt}
            />
          </div>

          <div className={style.sectionText}>
            <h1 className={style.sectionTitle}>{constant.sectionTitle}</h1>
            <p>
              {constant.sectionText}{" "}
              <a
                target="_blank"
                title={constant.linkTitle}
                href={constant.linkHref}
                className={style.sectionLinks}
              >
                {" "}
                {constant.linkText}
              </a>
              .
            </p>
          </div>
        </section>
      );
    });
  };

  return (
    <div className={style.mainPageContainer}>
      <Carousel autoplay>{cardRenderer()}</Carousel>
    </div>
  );
};

export default Main;
