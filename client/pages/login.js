import React from "react";
import { Card, Row, Form, Input, Button, message } from "antd";
import Styles from "../styles/pages/Login.module.scss";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { SignIn } from "../services/auth.service";

export default function login() {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const info = useSelector((state) => state.user);

  const loginMutation = useMutation(SignIn, {
    onError: (e) => {
      message.error("Login failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Logged in successfully!");
      router.push("/seller/dashboard");
      // dispatch(login(data));
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
        </Form>
      </Card>
    </Row>
  );
}
