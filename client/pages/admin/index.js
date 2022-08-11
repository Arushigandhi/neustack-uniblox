import React from "react";
import { Card, Row, Form, Input, Button, message, Col } from "antd";
import Styles from "../../styles/pages/Login.module.scss";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { login } from "store/user.slice";
import { SignIn } from "services/auth.service";

export default function AdminLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginMutation = useMutation(SignIn, {
    onError: (e) => {
      message.error("Login failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Logged in successfully!");
      router.push("/admin/dashboard");
      dispatch(login(data));
    },
  });

  const onLoginSubmit = async (values) => {
    await loginMutation.mutateAsync(values);
  };

  return (
    <Row justify="center" align="middle" className={Styles.container}>
      <Card hoverable className={Styles.card}>
        <h1>Admin Login</h1>
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
          <Col>
            <div>Use Admin Credentials:</div>
            <div>Phone Number: 8017727622</div>
            <div>Password: Aryamann</div>
          </Col>
        </Form>
      </Card>
    </Row>
  );
}
