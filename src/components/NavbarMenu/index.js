//React
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

//Ant-design
import "antd/dist/antd.css";
import { LoginOutlined } from "@ant-design/icons";

//Style and animation
import style from "./style.module.css";

import { navigation } from "../../constants/navigationConstants";
import UserContext from "../../context/UserContext";
import ModelRenderer from "../ModelRenderer";

const NavbarMenu = () => {
  const [isForSignUp, setIsForSignUp] = useState(false);
  const [isForSignIn, setIsForSignIn] = useState(false);
  const { isLoggedIn, logout } = useContext(UserContext);

  const showModal = (componentName) => {
    if (componentName === "SignUp") {
      setIsForSignUp(true);
    } else {
      setIsForSignIn(true);
    }
  };

  const handleClick = () => {
    logout();
    window.location.replace("/");
  };

  return (
    <div>
      <div className={style.menuContainer}>
        {/* Navigation links */}
        {isLoggedIn && (
          <div className={style.menu}>
            <div className={style.menuItem}>
              {navigation.map((item) => {
                return (
                  <Link
                    key={item.navTitle}
                    className={style.menuLinks}
                    to={item.link}
                  >
                    {item.navTitle}
                  </Link>
                );
              })}
            </div>

            <div
              className={style.logoutIconContainer}
              title="Logout"
              onClick={handleClick}
            >
              <LoginOutlined className={style.logoutIcon} />
            </div>
          </div>
        )}

        {/* Registration and login*/}
        {!isLoggedIn && (
          <div className={style.userRegistration}>
            <span onClick={() => showModal("SignUp")}>Sign Up</span>
            <span> / </span>
            <span onClick={() => showModal("SignIn")}>Sign In</span>
          </div>
        )}
      </div>

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
