import { Button, Card, Form, Input, InputNumber, message, Row } from "antd";
import Link from "next/link";
import React from "react";
import { useMutation } from "react-query";
import { AddDiscount } from "services/admin.service";
import Styles from "../../styles/pages/Login.module.scss";

export default function dashboard() {
  const addDiscountMutation = useMutation(AddDiscount, {
    onSuccess: () => {
      message.success("Discount added successfully");
    },
  });
  const onFinish = (values) => {
    addDiscountMutation.mutateAsync(values);
  };

  return (
    <>
      <Row justify="center" align="middle" className={Styles.container}>
        <Card hoverable className={Styles.card}>
          <h1>Add Discount</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="discount_name">
              <Input placeholder="Discount Code" size="large" />
            </Form.Item>
            <Form.Item name="value">
              <Input placeholder="Discount Value" size="large" />
            </Form.Item>
            <div className={Styles.loginBtn}>
              <Button className={Styles.outlineButton} htmlType="submit">
                Add Discount
              </Button>
            </div>
          </Form>
          <Link href="/admin/list">Go to Admin Portal</Link>
        </Card>
      </Row>
    </>
  );
}
