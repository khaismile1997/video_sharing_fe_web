import { useState } from "react";

import { Button, Col, Input, Row, Space, Typography } from "antd";

type SharingModalPros = {
  onShare: (url: string) => void;
  loading: boolean;
};

function SharingModal({ onShare, loading }: SharingModalPros) {
  const [url, setUrl] = useState("");

  return (
    <Row gutter={[24, 24]} justify={"center"}>
      <Col span={24}>
        <Row gutter={[12, 12]} align={"middle"}>
          <Col>
            <Typography.Text>Youtube URL: </Typography.Text>
          </Col>
          <Col flex={1}>
            <Input
              style={{ width: "100%" }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onShare(url);
          }}
          type="primary"
          loading={loading}
        >
          Share
        </Button>
      </Col>
    </Row>
  );
}

export default SharingModal;
