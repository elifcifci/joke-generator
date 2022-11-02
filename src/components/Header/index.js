import React, { useState } from "react";
import { Link } from "react-router-dom";

//Components
import ModelRenderer from "../ModelRenderer";

//Ant-design
import "antd/dist/antd.css";
import { Space, Breadcrumb, Drawer } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

import style from "./style.module.css";

const Header = () => {
  const [isForSignUp, setIsForSignUp] = useState(false);
  const [isForSignIn, setIsForSignIn] = useState(false);

  const showModal = (componentName) => {
    if (componentName === "SignUp") {
      setIsForSignUp(true);
    } else {
      setIsForSignIn(true);
    }
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.headerContainer}>
      <Space size="large" align="center" className={style.headerInnerContainer}>
        <div className={style.pageIconAndTitle}>
          {/* Chuck Norris Gif */}
          <img
            className={style.headerGif}
            src="https://media.tenor.com/BupEc9JI6S0AAAAi/chuck-norris-minion.gif"
            alt="Chuck Norris Minion Sticker - Chuck Norris Minion Emote Stickers"
          />
          <h1 className={style.headerTitle}>Chuck Norris Facts</h1>
        </div>
        <EllipsisOutlined
          onClick={showDrawer}
          style={{ fontSize: "40px", color: "#bf9e8f" }}
        />
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          open={open}
          onClick={onClose}
        >
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => showModal("SignUp")}>
              Sign Up
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => showModal("SignIn")}>
              Sign In
            </Breadcrumb.Item>
          </Breadcrumb>

          <Space align="center">
            <Link to="/">Main</Link>
            <Link to="/facts-viewer">Facts</Link>
            <Link to="/facts-in-saved">Saved Facts</Link>
          </Space>
        </Drawer>
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
