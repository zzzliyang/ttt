import React from "react";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "../css/FormStep1.css";

const formItemLayout = {
  labelCol: {
    xs: { span: 14 },
    sm: { span: 14 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 10 }
  }
};

const FormStep1 = () => {
  const onFinish = values => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      name="form-step1"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      labelAlign="right"
    >
      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Temperature:" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  <InputNumber />
                </Form.Item>
                <span
                  style={{
                    display: "inline-block",
                    width: "24px",
                    textAlign: "center"
                  }}
                >
                  Date:
                </span>
                <Form.Item
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  <DatePicker />
                </Form.Item>
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Contact"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormStep1;
