import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Col, Modal, Row, Space, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import SharingModal from "./sharingModal";

import { useUser } from "hooks/useUser";
import { AppDispatch } from "store";
import { shareVideo } from "store/videos.controller";
import { logout } from "store/users.controller";

import "./index.css";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onShare = async (url: string) => {
    setLoading(true);
    try {
      const { page } = await dispatch(shareVideo({ url })).unwrap();
      window.notify({
        type: 'success',
        description: 'Share video successfully!',
      })
    } catch (err: any) {
      window.notify({
        type: 'error',
        description: err.message,
      })
    } finally {
      setLoading(false);
      console.log("success");
    }
  };

  const onLogout = async () => {
    // setLoading(true);
    try {
      const { email } = await dispatch(logout({})).unwrap();
    } catch (err) {
      // notifyError(err)
      console.log(err);
    } finally {
      // setLoading(false);
      console.log("success");
    }
  };

  return (
    <Row
      gutter={[24, 24]}
      align="middle"
      style={{ borderBottom: "2px solid black" }}
    >
      <Col flex={1}>
        <Space align="center">
          <HomeOutlined size={50} className="home-header" />
          <Typography.Title>Funny Youtube</Typography.Title>
        </Space>
      </Col>
      <Col>
        <Row gutter={[16, 16]} align="middle">
          <Col flex={1}>
            <Typography.Text>Welcome {email}</Typography.Text>
          </Col>
          <Col>
            <Button onClick={() => setOpenModal(true)}>Share a movie</Button>
          </Col>
          <Col>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Col>
      <Modal
        open={openModal}
        footer={null}
        closable={false}
        title={
          <Space direction="vertical" style={{ width: "100%" }} align="center">
            Sharing Your Favorite Video
          </Space>
        }
        onCancel={() => setOpenModal(false)}
      >
        <SharingModal onShare={onShare} loading={loading} />
      </Modal>
    </Row>
  );
}

export default Header;
