//React
import React from "react";
import { Link } from "react-router-dom";

import style from "./style.module.css";

//Ant-design
import "antd/dist/antd.css";
import { Space, Typography } from "antd";
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
            className={style.errorPageGif}
            src="https://media.tenor.com/GdF28omU-1YAAAAC/chuck-norris-kick-action.gif"
            alt="Chuck Norris kick action gif"
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
