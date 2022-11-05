//React
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

//Ant-design
import "antd/dist/antd.css";
import { Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

//Style and animation
import { useCycle } from "framer-motion";
import style from "./style.module.css";

import NavbarMenu from "../NavbarMenu";
import { navigation } from "../../constants/navigationConstants";

const Header = () => {
  const [isOpen, cycleIsOpen] = useCycle(false, true);
  const [pageTitle, setPageTitle] = useState("");
  const { pathname } = useLocation();
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    let innerWidth = window.innerWidth;
    setPageWidth(innerWidth);
  }, [isOpen]);

  useEffect(() => {
    navigation.forEach((item) => {
      if (item.link === pathname || item.link === "") {
        setPageTitle(item.title);
      }
    });
  }, [pathname]);

  const showMenu = () => {
    cycleIsOpen();
  };

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

        <h1 className={style.headerTitle}>{pageTitle}</h1>
        <EllipsisOutlined
          rotate={isOpen ? 90 : 0}
          onClick={showMenu}
          className={style.ellipsis}
        />
      </div>
      <NavbarMenu isOpen={isOpen} showMenu={showMenu} />
    </Space>
  );
};

export default Header;
