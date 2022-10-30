import React, { useState } from "react";
import { Link } from "react-router-dom";
//Components
import SignUp from "../SignUp";
import SignIn from "../SignIn";

//Ant-design
import "antd/dist/antd.css";
import { Space, Breadcrumb } from "antd";

const Header = () => {
  const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);
  const [isVisibleSignIn, setIsVisibleSignIn] = useState(false);

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
          <Breadcrumb.Item
            onClick={() => setIsVisibleSignUp((previous) => !previous)}
          >
            Sign Up
          </Breadcrumb.Item>

          <Breadcrumb.Item
            onClick={() => setIsVisibleSignIn((previous) => !previous)}
          >
            Sign In
          </Breadcrumb.Item>
        </Breadcrumb>
      </Space>
      {isVisibleSignUp && <SignUp />}
      {isVisibleSignIn && <SignIn />}
    </div>
  );
};

export default Header;
