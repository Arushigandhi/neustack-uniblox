import React from "react";
import { Card, Row, Form, Input, Button, message } from "antd";
import Styles from "../styles/pages/Login.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { SignUp } from "../services/auth.service";

export default function login() {
  const router = useRouter();

  const registerMutation = useMutation(SignUp, {
    onError: (e) => {
      message.error("Register failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Registered successfully!");
      router.push("/seller/dashboard");
    },
  });

  const onRegSubmit = async (values) => {
    await registerMutation.mutateAsync(values);
  };

  return (
    <Row justify="center" align="middle" className={Styles.container}>
      <Card hoverable className={Styles.card}>
        <h1>Register to your application!</h1>
        <Form layout="vertical" onFinish={onRegSubmit}>
          <Form.Item name="phoneNumber">
            <Input placeholder="Phone Number" size="large" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <div className={Styles.loginBtn}>
            <Button className={Styles.outlineButton} htmlType="submit">
              Register
            </Button>
          </div>
          <p>
            Already have an account?{" "}
            <span>
              <a href="/register">Login Now</a>
            </span>
          </p>
        </Form>
      </Card>
    </Row>
  );
}
