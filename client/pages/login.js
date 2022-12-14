import React from "react";
import { Card, Row, Form, Input, Button, message, Col } from "antd";
import Styles from "../styles/pages/Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { SignIn } from "../services/auth.service";
import { login } from "store/user.slice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginMutation = useMutation(SignIn, {
    onError: (e) => {
      message.error("Login failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Logged in successfully!");
      router.push("/dashboard");
      dispatch(login(data));
    },
  });

  const onLoginSubmit = async (values) => {
    await loginMutation.mutateAsync(values);
  };

  return (
    <Row justify="center" align="middle" className={Styles.container}>
      <Card hoverable className={Styles.card}>
        <h1>Login to your application!</h1>
        <Form layout="vertical" onFinish={onLoginSubmit}>
          <Form.Item name="phoneNumber">
            <Input placeholder="Phone Number" size="large" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <div className={Styles.loginBtn}>
            <Button className={Styles.outlineButton} htmlType="submit">
              Login
            </Button>
          </div>
          <p>
            Don't have an account?{" "}
            <span>
              <a href="/register">Register Now</a>
            </span>
          </p>
          <Col>
            <div>Use Sample Credentials:</div>
            <div>Phone Number: 9323017320</div>
            <div>Password: Aryamann</div>
          </Col>
        </Form>
      </Card>
    </Row>
  );
}
