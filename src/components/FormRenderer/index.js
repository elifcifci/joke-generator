import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

const FormRenderer = ({ constants, processFor, setIsModalOpen }) => {
  const { updateIsUserRegistered, addNewUsers } = useContext(UserContext);

  const onFinish = (values) => {
    setIsModalOpen(false);
    processFor === "signIn"
      ? updateIsUserRegistered(values)
      : processFor === "signUp"
      ? addNewUsers(values)
      : console.log("TEST");
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
          <Input />
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
