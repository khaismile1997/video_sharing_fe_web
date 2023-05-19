import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Row, Space, Tabs, Typography, Image } from "antd";
import Login from "./login";
import Signup from "./signup";

import YTLogo from "static/images/youtube.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { reLogin } from "store/users.controller";
import { useUser } from "hooks/useUser";
import { ROUTES } from "constant/routes";

type FormType = "signin" | "signup";

const Auth = () => {
  const navigate = useNavigate();
  const { session_token } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [formType, setFormType] = useState<FormType>("signin");

  useEffect(() => {
    if (session_token) navigate(ROUTES.HOME);
  }, [session_token, navigate]);

  useEffect(() => {
    dispatch(reLogin()).unwrap();
  }, [dispatch]);

  return (
    <Row gutter={[24, 24]} justify={"center"}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Space
              style={{ width: "100%", justifyContent: "center" }}
              align="center"
            >
              <Image src={YTLogo} width={44} />
              <Typography.Title level={3}>YouTube Sharing</Typography.Title>
            </Space>
          </Col>
          <Col span={24}>
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              align="center"
            >
              <Typography.Text>Youtube Video Sharing App</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row justify={"center"} gutter={[24, 24]}>
          <Col>
            <Tabs
              centered
              activeKey={formType}
              onChange={(activeKey) => setFormType(activeKey as FormType)}
            >
              <Tabs.TabPane key={"signin"} tab={"Sign In"} />
              <Tabs.TabPane key={"signup"} tab={"Sign Up"} />
            </Tabs>
          </Col>
          <Col span={24}>
            {formType === "signin" && <Login />}
            {formType === "signup" && <Signup />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Auth;
