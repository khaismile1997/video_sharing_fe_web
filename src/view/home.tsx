import { useState } from "react";

import { Button, Col, Row } from "antd";
import Header from "components/header";
import VideoCard from "components/videoCard";
import VideoWatcher from "watcher/videoWatcher";

import { useMeta, usePage, useVideos } from "hooks/useVideo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getListVideo } from "store/videos.controller";


function Home() {
  const [loading, setLoading] = useState(false)
  const videos = useVideos();
  const meta = useMeta();
  const page = usePage();
  const dispatch = useDispatch<AppDispatch>();

  const onViewMore = async () => {
    setLoading(true);
    try {
      await dispatch(getListVideo({})).unwrap();
    } catch (err: any) {
      window.notify({
        type: "error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Row gutter={[24, 24]} justify={"center"} style={{ marginBottom: 50 }}>
      <VideoWatcher/>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={16}>
        <Row gutter={[12, 12]} justify={"center"}>
          {videos.map((val) => {
            return (
              <Col key={val.id}>
                <VideoCard videoInfo={val} />
              </Col>
            );
          })}
          <Col>
            <Button disabled={page >= meta.total_pages} onClick={onViewMore} loading={loading}>View More</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
