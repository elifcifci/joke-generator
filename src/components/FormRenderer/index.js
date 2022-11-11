import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

//Ant Design
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import style from "./style.module.css";

const FormRenderer = ({ constants, processFor, setIsModalOpen }) => {
  const { checkUserRegistered } = useContext(UserContext);

  const onFinish = (values) => {
    processFor === "signIn"
      ? checkUserRegistered(values, "signIn", setIsModalOpen)
      : checkUserRegistered(values, "signUp", setIsModalOpen);
  };

  const fromItemRenderer = () => {
    return constants.map((constant) => {
      return (
        <Form.Item
          key={constant.id}
          label={constant.label}
          name={constant.name}
          rules={constant.rules}
          {...(constant.id === "sing-up-password-confirm" && {
            hasFeedback: true,
            dependencies: ["password"],
          })}
        >
          {constant.name === "password" || constant.name === "confirm" ? (
            <Input.Password />
          ) : (
            <Input />
          )}
        </Form.Item>
      );
    });
  };
  return (
    <Form
      layout="horizontal"
      hideRequiredMark
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 15 }}
      className={style.formContainer}
      style={{
        boxShadow: "none",
      }}
    >
      {fromItemRenderer()}
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default FormRenderer;
