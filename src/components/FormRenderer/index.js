import React from "react";

import "antd/dist/antd.css";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

const FormRenderer = ({ constants, initialValue, handleClick }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {fromItemRenderer}
    </Form>
  );
};

export default FormRenderer;
