import React, { useContext, useState } from "react";
import JokesContext from "../../context/JokesContext";
import Filter from "../Filter";
import ModelRenderer from "../ModelRenderer";

import "antd/dist/antd.css";
import { Button, Space, Typography, Divider, message } from "antd";
const { Title } = Typography;

const JokeViewer = () => {
  const {
    randomJoke,
    categorizedJoke,
    openNextCategorizedJoke,
    openNextRandomJoke,
    addInBasketOrSavedJokes,
  } = useContext(JokesContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const success = () => {
    message.success("This is a success message");
  };

  const handleClick = (joke, targetPlace) => {
    addInBasketOrSavedJokes(joke, targetPlace);
    success();
  };
  return (
    <div
      style={{
        margin: "16px 0",
        padding: "0 30px",
      }}
    >
      <section>
        <Divider orientation="left">
          <Title level={2}>Random Facts</Title>
        </Divider>

        <Space size="large" align="center">
          <div>{randomJoke.value}</div>

          <Space size="middle">
            <Button onClick={openNextRandomJoke}>Next Fact</Button>
            <Button onClick={() => handleClick(randomJoke, "toBasket")}>
              Facts Basket
            </Button>
          </Space>
        </Space>
      </section>

      <section>
        <Divider orientation="left">
          <Title level={2}>Categorized Facts </Title>
        </Divider>

        <Filter />
        <Space size="large" align="center">
          <div>{categorizedJoke.value}</div>
          <Space size="middle">
            <Button onClick={openNextCategorizedJoke}>Next Fact</Button>
            <Button onClick={() => handleClick(categorizedJoke, "toBasket")}>
              Facts Basket
            </Button>
          </Space>
        </Space>
      </section>

      <section>
        <Button type="primary" onClick={showModal}>
          Open Your Basket
        </Button>
        <ModelRenderer
          modalTitle="Facts in Your Basket"
          componentName="FactsInBasket"
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </section>
    </div>
  );
};

export default JokeViewer;
