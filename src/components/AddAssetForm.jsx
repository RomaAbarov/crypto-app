import { useContext, useRef, useState } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { ContextCrypto } from "../context/context";
import { useForm } from "antd/es/form/Form";

export default function AddAssetForm({ onClose }) {
  const [form] = useForm();
  const { crypto, addAsset } = useContext(ContextCrypto);
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        placeholder="select coin"
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img src={option.data.icon} alt={option.data.label} width="20px" />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added"
        subTitle={` Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    addAsset(newAsset);
    assetRef.current = newAsset;
    setSubmitted(true);
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{ price: +coin.price.toFixed(2) }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Flex>
          <img src={coin.icon} alt={coin.name} width="40px" />
          <Typography.Title level={2} style={{ margin: 0 }}>
            {coin.name}
          </Typography.Title>
        </Flex>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="введите кол-во "
            onChange={handleAmountChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber
            placeholder="введите цену"
            onChange={handlePriceChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Date & time" name="date">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
