import React from "react";
import FactsInBasket from "../FactsInBasket";
import SignUp from "../SignUp";
import SignIn from "../SignIn";

import "antd/dist/antd.css";
import { Modal } from "antd";

const ModelRenderer = ({
  modalTitle,
  componentName,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        className={componentName === "FactsInBasket" ? "basketModal" : ""}
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {componentName === "SignUp" ? (
          <SignUp />
        ) : componentName === "SignIn" ? (
          <SignIn />
        ) : (
          <FactsInBasket />
        )}
      </Modal>
    </div>
  );
};

export default ModelRenderer;
