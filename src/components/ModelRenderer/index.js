import React from "react";

import style from "./style.module.css";
import "antd/dist/antd.css";
import { Modal } from "antd";
import FormRenderer from "../FormRenderer";
import { signInConstants } from "../../constants/signInConstants";
import { signUpConstants } from "../../constants/signUpConstants";

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
        className={style.basketModal}
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {componentName === "SignUp" ? (
          <FormRenderer
            processFor="signUp"
            constants={signUpConstants}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <FormRenderer
            processFor="signIn"
            constants={signInConstants}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default ModelRenderer;
