import { Col, Row, Image, Button, Typography, Space } from "antd";
import { LikeOutlined } from "@ant-design/icons";

import YTLogo from "static/images/youtube.png";
import YouTube, { YouTubeProps } from "react-youtube";

import { useUser } from "hooks/useUser";
import { useState } from "react";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import { Video, like } from "store/videos.controller";

type VideoCardProps = {
  videoInfo: Video;
};
function VideoCard({ videoInfo }: VideoCardProps) {
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingUnLike, setLoadingUnLike] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useUser();
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "200",
    width: "300",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onLike = async (videoId: string) => {
    setLoadingLike(true);
    try {
      const data = await dispatch(like({ videoId })).unwrap();
    } catch (err) {
      // notifyError(err)
      console.log(err);
    } finally {
      setLoadingLike(false);
    }
  };

  console.log(videoInfo);

  return (
    <Row gutter={[36, 36]} wrap={false}>
      <Col>
        <YouTube
          videoId={videoInfo.url?.substring(videoInfo.url.length - 11)}
          opts={opts}
          onReady={onPlayerReady}
        />
      </Col>
      <Col flex={1}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Row gutter={[8, 8]} wrap={false}>
              <Col flex={1}>
                <Typography.Title
                  level={4}
                  style={{ marginTop: 0 }}
                  ellipsis={{ rows: 2 }}
                >
                  {videoInfo.title}
                </Typography.Title>
                <Typography.Text>Shared by: {user.email}</Typography.Text>
                <Space style={{ width: "100%" }} size={8}>
                  <Space size={2}>
                    <Typography.Text>{videoInfo.total_likes}</Typography.Text>
                    <LikeOutlined />
                  </Space>
                  <Space size={2}>
                      <Typography.Text>
                        {videoInfo.total_dislikes}
                      </Typography.Text>
                      <LikeOutlined />
                    </Space>
                </Space>
              </Col>
              <Col>
                <Space size={4}>
                  <Button
                    icon={<LikeOutlined />}
                    onClick={async () => await onLike(videoInfo.id)}
                  />
                  <Button icon={<LikeOutlined />} />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Space style={{ width: "100%" }} direction="vertical" size={8}>
              <Typography.Text strong>Description</Typography.Text>
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                {videoInfo.description}
              </Typography.Paragraph>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default VideoCard;
