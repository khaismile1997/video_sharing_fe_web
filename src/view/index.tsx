import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import UILoader from "uiloader";
import Auth from "./auth";
import Home from "./home";

import { useUser } from "hooks/useUser";
import { ROUTES } from "constant/routes";
// import Aos from 'aos'
// import PoolWatcher from 'watcher/pool.watcher'
// import 'aos/dist/aos.css'

const App: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();
  //   useEffect(function () {
  //     Aos.init({ duration: 1000 })
  //   }, [])

  useEffect(()=>{
    if (!user.session_token) {
      return navigate(ROUTES.LOGIN);
    }
  }, [user.session_token, navigate])

  return (
    <UILoader>
      <Layout>
        {/* <PoolWatcher/> */}
        <Content>
          <Row justify="center">
            <Col span={18} style={{ minHeight: 350 }}>
              <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/*" element={<Home />} />
              </Routes>
            </Col>
          </Row>
        </Content>
      </Layout>
    </UILoader>
  );
};

export default App;
