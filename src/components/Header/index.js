//React
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

//Ant-design
import "antd/dist/antd.css";
import { Space } from "antd";

//Style and animation
import style from "./style.module.css";

import NavbarMenu from "../NavbarMenu";
import { navigation } from "../../constants/navigationConstants";

const Header = () => {
  const [pageTitle, setPageTitle] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    navigation.forEach((item) => {
      if (item.link === pathname || item.link === "") {
        setPageTitle(item.title);
      }
    });
  }, [pathname]);

  return (
    <Space size="large" align="center" className={style.headerContainer}>
      <div className={style.pageIconAndTitle}>
        {/* Chuck Norris Gif */}
        <Link className={style.headerGifContainer} to="/">
          <img
            className={style.headerGif}
            src="https://media.tenor.com/BupEc9JI6S0AAAAi/chuck-norris-minion.gif"
            alt="Chuck Norris Minion Sticker - Chuck Norris Minion Emote Stickers"
          />
        </Link>

        <div className={style.titleContainer}>
          {pageTitle !== "Chuck Norris Facts" && (
            <Link className={`${style.headerTitle} ${style.headerLink}`} to="/">
              CNF
            </Link>
          )}

          <h1 className={style.headerTitle}>{pageTitle}</h1>
        </div>
      </div>
      <NavbarMenu />
    </Space>
  );
};

export default Header;
