//React
import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Styles
import style from "./style.module.css";

import UserContext from "../../context/UserContext";
import PageTitle from "../PageTitle";
import UserProfile from "../UserProfile";
import { navigation } from "../../constants/navigationConstants";

const Header = () => {
  const { isLoggedIn } = useContext(UserContext);

  const renderMenuItems = () => (
    <section className={style.headerMenuItemContainer}>
      {navigation.onNavbar.map((item) => {
        return (
          <Link
            key={item.navTitle}
            id={item.navTitle}
            className={style.headerMenuLinks}
            to={item.link}
          >
            {item.navTitle}
          </Link>
        );
      })}
    </section>
  );

  return (
    <div className={style.headerContainer}>
      <PageTitle />
      <div className={style.headerMenu}>
        {/* Main and facts page links */}
        {isLoggedIn && renderMenuItems()}
        <UserProfile />
      </div>
    </div>
  );
};

export default Header;
