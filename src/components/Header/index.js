import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import UserContext from "../../context/UserContext";
import { navigation } from "../../constants/navigationConstants";

//Components
import ModelRenderer from "../ModelRenderer";

//Ant-design
import "antd/dist/antd.css";
import { Space } from "antd";
import { EllipsisOutlined, LoginOutlined } from "@ant-design/icons";

import { motion, useCycle } from "framer-motion";
import style from "./style.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useCycle(false, true);
  const [pageWidth, setPageWidth] = useState(0);
  const [isForSignUp, setIsForSignUp] = useState(false);
  const [isForSignIn, setIsForSignIn] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const { pathname } = useLocation();
  const { isLoggedIn, logout } = useContext(UserContext);

  const animationConfig = {
    open: {
      x: -pageWidth,
      opacity: 1,
      display: "flex",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
      },
    },
    close: {
      x: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    disappear: {
      display: "none",
      transition: {
        delay: 0.3,
      },
    },
    textOpen: {
      opacity: 1,
      transition: {
        delay: 0.7,
      },
    },
    textClose: {
      opacity: 0,
    },
  };

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

  const showModal = (componentName) => {
    if (componentName === "SignUp") {
      setIsForSignUp(true);
    } else {
      setIsForSignIn(true);
    }
  };

  const showMenu = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <div className={style.headerContainer}>
      <Space size="large" align="center" className={style.headerInnerContainer}>
        <div className={style.pageIconAndTitle}>
          {/* Chuck Norris Gif */}
          <Link className={style.navigationItem} to="/">
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
            style={{
              fontSize: "40px",
              position: "absolute",
              right: 5,
              top: 15,
              color: "#bf9e8f",
              zIndex: 9,
            }}
          />
        </div>

        <motion.div
          variants={animationConfig}
          onClick={showMenu}
          initial={{ opacity: 0 }}
          animate={isOpen ? "open" : ["close", "disappear"]}
          className={style.menuContainer}
        >
          {/* Navigation links */}
          {isLoggedIn && (
            <motion.div
              variants={animationConfig}
              initial={{ opacity: 0 }}
              animate={isOpen ? "textOpen" : "textClose"}
              className={style.navigation}
            >
              <Link className={style.navigationItem} to="/">
                Main
              </Link>
              <Link className={style.navigationItem} to="/facts-viewer">
                Facts
              </Link>
              <Link className={style.navigationItem} to="/facts-in-basket">
                Basket
              </Link>
              <Link className={style.navigationItem} to="/facts-in-saved">
                Saved
              </Link>
            </motion.div>
          )}

          {/* Registration and login*/}
          {!isLoggedIn && (
            <motion.div
              variants={animationConfig}
              initial={{ opacity: 0 }}
              animate={isOpen ? "textOpen" : "textClose"}
              className={style.userRegistration}
            >
              <span onClick={() => showModal("SignUp")}>Sign Up</span>
              <span> / </span>
              <span onClick={() => showModal("SignIn")}>Sign In</span>
            </motion.div>
          )}

          {isLoggedIn && (
            <motion.div
              variants={animationConfig}
              initial={{ opacity: 0 }}
              animate={isOpen ? "textOpen" : "textClose"}
              className={style.logoutIconContainer}
              title="Logout"
            >
              <LoginOutlined onClick={() => logout()} />
            </motion.div>
          )}
        </motion.div>
      </Space>

      {isForSignUp && (
        <ModelRenderer
          modalTitle="Sign Up"
          componentName="SignUp"
          setIsModalOpen={setIsForSignUp}
          isModalOpen={isForSignUp}
        />
      )}
      {isForSignIn && (
        <ModelRenderer
          modalTitle="Sign In"
          componentName="SignIn"
          setIsModalOpen={setIsForSignIn}
          isModalOpen={isForSignIn}
        />
      )}
    </div>
  );
};

export default Header;
