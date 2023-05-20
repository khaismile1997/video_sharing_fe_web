import { Col, Row, Button, Typography, Space } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

import YouTube, { YouTubeProps } from "react-youtube";

import { useUser } from "hooks/useUser";
import { useState } from "react";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import { Video, dislike, like, undislike, unlike } from "store/videos.controller";

type VideoCardProps = {
  videoInfo: Video;
};
function VideoCard({ videoInfo }: VideoCardProps) {
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingDislike, setLoadingDislike] = useState(false);
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

  const onDislike = async (videoId: string) => {
    setLoadingDislike(true);
    try {
      if(videoInfo.liked !== false) {
        await dispatch(dislike({ videoId })).unwrap();
      }else{
        await dispatch(undislike({ videoId })).unwrap()
      }
    } catch (err: any) {
      window.notify({
        type: "error",
        description: err.message,
      });
    } finally {
      setLoadingDislike(false);
    }
  };

  const onLike = async (videoId: string) => {
    setLoadingLike(true);
    try {
      if(videoInfo.liked !== true) {
        await dispatch(like({ videoId })).unwrap();
      }else{
        await dispatch(unlike({ videoId })).unwrap()
      }
    } catch (err: any) {
      window.notify({
        type: "error",
        description: err.message,
      });
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <Row gutter={[36, 36]} >
      <Col span={8}>
        <YouTube
          videoId={videoInfo.url?.substring(videoInfo.url.length - 11)}
          opts={opts}
          onReady={onPlayerReady}
        />
      </Col>
      <Col xxl={16}>
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
                    <DislikeOutlined />
                  </Space>
                </Space>
              </Col>
              <Col>
                <Space size={4}>
                  <Button
                    icon={
                      videoInfo.liked !== true ? (
                        <LikeOutlined />
                      ) : (
                        <LikeFilled style={{ color: "#1677ff" }} />
                      )
                    }
                    onClick={async () => await onLike(videoInfo.id)}
                    disabled={videoInfo.liked === false}
                  />
                  <Button
                    icon={
                      videoInfo.liked !== false ? (
                        <DislikeOutlined />
                      ) : (
                        <DislikeFilled />
                      )
                    }
                    disabled={videoInfo.liked === true}
                    onClick={async () => await onDislike(videoInfo.id)}
                  />
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
