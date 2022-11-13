import React from "react";
import FormRenderer from "../FormRenderer";
import style from "./style.module.css";
//Ant Design
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import { Modal } from "antd";

//Constants
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
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className={style.modalContainer}
        style={{
          boxShadow: "none",
        }}
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
