import { Route, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Form, Input, Checkbox, Button, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login, } from 'store/users.controller'
import { AppDispatch } from "store";
import { ROUTES } from "constant/routes";
import config from "config";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  
  const onLogin = async(values: any) => {
    try {
      const { email } = await dispatch(login({ email: values.email, password: values.password })).unwrap()
    } catch (err) {
      // notifyError(err)
      console.log(err)
    } finally {
      navigate(ROUTES.HOME)
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
      <Form.Item >
        <Row>
          <Col flex={1}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
