import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Checkbox, Button, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login } from "store/users.controller";
import { AppDispatch } from "store";
import { ROUTES } from "constant/routes";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = async (values: any) => {
    setLoading(true);
    try {
      await dispatch(
        login({ email: values.email, password: values.password })
      ).unwrap();
      navigate(ROUTES.HOME);
    } catch (err: any) {
      window.notify({
        type: "error",
        description: err.message ,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onLogin}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Row>
          <Col flex={1}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
