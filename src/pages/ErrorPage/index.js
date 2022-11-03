import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

//Ant-design
import "antd/dist/antd.css";
import { Button, Space, Typography } from "antd";
const { Title } = Typography;

const ErrorPage = () => {
  return (
    <Space className={style.errorPageContainer} size="large" align="center">
      <Title level={1} className={style.errorPageTitle}>
        Error
      </Title>
      <Space size={30} className={style.errorPageInnerContainer}>
        {/* Chuck Norris Gif */}
        <Space>
          <img
            src="https://media.tenor.com/GdF28omU-1YAAAAC/chuck-norris-kick-action.gif"
            style={{
              width: "100px",
              height: "130px",
              borderRadius: "20px",
            }}
            alt="Chuck Norris Kick Action GIF - Chuck Norris Kick Action Walker Texas Ranger GIFs"
          />
          <p className={style.errorPageText}>
            The page you are looking for was not found or you are not logged in!{" "}
          </p>
        </Space>

        <Link className={style.errorPageLink} to="/">
          Main
        </Link>
      </Space>
    </Space>
  );
};

export default ErrorPage;
