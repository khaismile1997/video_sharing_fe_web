import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Col, Row } from "antd";
import Header from "components/header";
import VideoCard from "components/videoCard";

import { AppDispatch } from "store";
import { getListVideo } from "store/videos.controller";
import { useVideos } from "hooks/useVideo";
import { reLogin } from "store/users.controller";

function Home() {
  const dummyData = [1, 2, 3];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const videos = useVideos();

  const fetchVideo = useCallback(async () => {
    setLoading(true);
    try {
      const { page } = await dispatch(getListVideo({})).unwrap();
    } catch (err) {
      // notifyError(err)
      console.log(err);
    } finally {
      setLoading(false);
      console.log("success");
    }
  }, []);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  return (
    <Row gutter={[24, 24]} justify={"center"} style={{ marginBottom: 50 }}>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={16}>
        <Row gutter={[12, 12]}>
          {videos.map((val) => {
            return (
              <Col key={val.id}>
                <VideoCard videoInfo={val} />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
