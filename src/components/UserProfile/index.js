//React
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

//Ant Design and Css
import style from "./style.module.css";
import { UserOutlined } from "@ant-design/icons";

//Other
import UserContext from "../../context/UserContext";
import ModelRenderer from "../ModelRenderer";
import { navigation } from "../../constants/navigationConstants";

const UserProfile = () => {
  const [isForSignUp, setIsForSignUp] = useState(false);
  const [isForSignIn, setIsForSignIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { isLoggedIn, logout } = useContext(UserContext);

  const showModal = (componentName) => {
    componentName === "SignUp" ? setIsForSignUp(true) : setIsForSignIn(true);
  };

  const checkTitleIsLogout = (event) => {
    event.target.id === "Logout" && logout();
  };

  const renderUserProfileItems = (constant, isRegistrationItem = false) => (
    <section className={style.userMenu}>
      {constant.map((item) => {
        return isRegistrationItem ? (
          <div
            className={style.menuLinks}
            key={item.title}
            onClick={() => showModal(item.id)}
          >
            {item.title}
          </div>
        ) : (
          <Link
            key={item.navTitle}
            id={item.navTitle}
            className={style.menuLinks}
            to={item.link}
            onClick={checkTitleIsLogout}
          >
            {item.navTitle}
          </Link>
        );
      })}
    </section>
  );

  return (
    <div>
      <div className={style.menuContainer}>
        <UserOutlined
          onClick={() => setIsOpenMenu((previous) => !previous)}
          className={style.userIcon}
        />
        {isOpenMenu &&
          (isLoggedIn
            ? renderUserProfileItems(navigation.inProfile)
            : renderUserProfileItems(navigation.registration, true))}
      </div>

      {/* ModelArea */}
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

export default UserProfile;
