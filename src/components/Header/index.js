import React, { useState } from "react";
import { Link } from "react-router-dom";

//Components
import ModelRenderer from "../ModelRenderer";

//Ant-design
import "antd/dist/antd.css";
import { Space, Breadcrumb } from "antd";

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

  return (
    <div>
      <Space size="large" align="center">
        {/* Chuck Norris Gif */}
        <img
          src="https://media.tenor.com/BupEc9JI6S0AAAAi/chuck-norris-minion.gif"
          alt="Chuck Norris Minion Sticker - Chuck Norris Minion Emote Stickers"
          style={{
            width: "40px",
            height: "50px",
            backgroundColor: "unset",
          }}
        />
        <h1>Chuck Norris Facts</h1>

        <Space align="center">
          <Link to="/">Main</Link>
          <Link to="/facts-viewer">Facts</Link>
          <Link to="/facts-in-saved">Saved Facts</Link>
        </Space>

        <Breadcrumb>
          <Breadcrumb.Item onClick={() => showModal("SignUp")}>
            Sign Up
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => showModal("SignIn")}>
            Sign In
          </Breadcrumb.Item>
        </Breadcrumb>
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
