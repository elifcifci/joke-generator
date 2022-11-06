import React from "react";
import style from "./style.module.css";
import { mainConstants } from "../../constants/mainConstants";

//Ant-design
import "antd/dist/antd.css";
import { Carousel } from "antd";

const Main = () => {
  const cardRenderer = () => {
    return mainConstants.map((constant) => {
      return (
        <section key={constant.id} className={style.sectionContainer}>
          <div className={style.innerContainer}>
            <div className={style.sectionImageContainer}>
              <img
                className={style.chuckNorrisPictures}
                src={constant.imgSrc}
                alt={constant.imgAlt}
              />
            </div>

            <div className={style.textsContainer}>
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
          </div>
        </section>
      );
    });
  };

  return (
    <div className={style.mainPageContainer}>
      <Carousel className={style.carousel}>{cardRenderer()}</Carousel>
    </div>
  );
};

export default Main;
