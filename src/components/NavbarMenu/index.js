//React
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//Ant-design
import "antd/dist/antd.css";
import { LoginOutlined } from "@ant-design/icons";

//Style and animation
import { motion } from "framer-motion";
import style from "./style.module.css";

import { navigation } from "../../constants/navigationConstants";
import UserContext from "../../context/UserContext";
import ModelRenderer from "../ModelRenderer";

const NavbarMenu = ({ isOpen, showMenu }) => {
  const [pageWidth, setPageWidth] = useState(0);
  const [isForSignUp, setIsForSignUp] = useState(false);
  const [isForSignIn, setIsForSignIn] = useState(false);
  const { isLoggedIn, logout } = useContext(UserContext);

  useEffect(() => {
    let innerWidth = window.innerWidth;
    setPageWidth(innerWidth);
  }, [isOpen]);

  console.log(pageWidth);

  let closeDragAmount = `${pageWidth >= 768 ? -pageWidth : 0}`;
  let isAnimated = `${
    pageWidth >= 768 ? (isOpen ? "textOpen" : "textClose") : "textOpen"
  }`;

  const animationConfig = {
    open: {
      x: -pageWidth,
      opacity: 1,
      display: "flex",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
      },
    },
    close: {
      x: closeDragAmount,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
      },
    },
    textOpen: {
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
    textClose: {
      opacity: 0,
    },
  };

  const showModal = (componentName) => {
    if (componentName === "SignUp") {
      setIsForSignUp(true);
    } else {
      setIsForSignIn(true);
    }
  };

  return (
    <div>
      <motion.div
        variants={animationConfig}
        onClick={showMenu}
        animate={isOpen ? "open" : "close"}
        className={style.menuContainer}
      >
        {/* Navigation links */}
        {isLoggedIn && (
          <motion.div
            variants={animationConfig}
            animate={isAnimated}
            className={style.menu}
          >
            {navigation.map((item) => {
              return (
                <Link
                  key={item.navTitle}
                  className={style.menuItem}
                  to={item.link}
                >
                  {item.navTitle}
                </Link>
              );
            })}

            <motion.div
              variants={animationConfig}
              animate={isAnimated}
              className={style.logoutIconContainer}
              title="Logout"
              onClick={() => logout()}
            >
              <LoginOutlined className={style.logoutIcon} />
            </motion.div>
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
      </motion.div>

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

export default NavbarMenu;
