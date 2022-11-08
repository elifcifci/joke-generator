import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

//Ant Design
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

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
      layout="vertical"
      hideRequiredMark
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {fromItemRenderer()}
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default FormRenderer;
