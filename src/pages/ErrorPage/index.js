import React from "react";
import { Link } from "react-router-dom";

//Ant-design
import "antd/dist/antd.css";
import { Space, Typography } from "antd";
const { Title } = Typography;

const ErrorPage = () => {
  return (
    <Space size="large" align="center">
      <Title level={1}>Error</Title>
      <Space>
        {/* Chuck Norris Gif */}
        <img
          src="https://media.tenor.com/GdF28omU-1YAAAAC/chuck-norris-kick-action.gif"
          style={{
            width: "100px",
            height: "130px",
            backgroundColor: "unset",
          }}
          alt="Chuck Norris Kick Action GIF - Chuck Norris Kick Action Walker Texas Ranger GIFs"
        />
        <p>The page you were looking for was not found</p>
      </Space>

      <Space align="center">
        <Link to="/">Main</Link>
      </Space>
    </Space>
  );
};

export default ErrorPage;
