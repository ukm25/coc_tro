import React, { useMemo, useState } from "react";

import {
  Form,
  Radio,
  InputNumber,
  Button,
  Input,
  Row,
  Col,
  Typography,
} from "antd";

const Title = Typography;

function CommonInformation(props) {
  //Post Type - Start
  const [postType, setPostType] = useState("");
  const valuePostType = ["Tìm ở ghép", "Cho thuê trọ"];
  //Post Type - End

  const onFinish = (value) => {
    props.nextBack("detail-information");
  };

  const titleMemo = useMemo(() => {
    return (
      <Form.Item name="title">
        <Title style={{ fontSize: 30 }}>Thông tin chung:</Title>
      </Form.Item>
    );
  }, []);

  const postTypeMemo = useMemo(() => {
    return (
      <Form.Item
        name="postType"
        label="Loại hình"
        rules={[
          {
            required: true,
            message: "Hãy chọn loại hình!",
          },
        ]}
      >
        <Radio.Group
          options={valuePostType}
          onChange={(e) => {setPostType(e.target.value)}}
          value={postType}
          defaultValue={postType}
        />
      </Form.Item>
    );
  }, [postType, valuePostType]);

  const roomTypeMemo = useMemo(() => {
    return (
      <Form.Item
        name="roomType"
        label="Loại phòng"
        rules={[
          {
            required: true,
            message: "Hãy chọn loại phòng!",
          },
        ]}
      >
        <Radio.Group
          options={props.valueRoomType}
          onChange={(e) => props.setRoomType(e.target.value)}
          value={props.roomType}
          defaultValue={props.roomType}
        />
      </Form.Item>
    );
  }, []);

  return (
    // onClick={(e) => props.nextBack("detail-information")}
    <Row>
      <Col span={22} offset={1}>
        <Form {...props.formItemLayout} onFinish={(value) => onFinish(value)}>
          <Row style={{ marginBottom: 30 }}>
            <Col style={{ width: "100%" }}>{titleMemo}</Col>
          </Row>
          <Row>
            <Col style={{ width: "100%" }}>{postTypeMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{roomTypeMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="name"
                label="Tên trọ:"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên trọ",
                  },
                  // { ten tro phai co it nhat 1 ky tu chu cai
                  //   required: true,
                  //   message: "Hãy nhập tên trọ",
                  // },
                ]}
              >
                <Row>
                  <Col span={15}>
                    <Input
                      value={props.roomName}
                      defaultValue={props.roomName}
                      onChange={(e) => props.setRoomName(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="numberRoomAvailable"
                label="Số lượng phòng trống (đơn vị: phòng)"
              >
                <InputNumber
                  min={0}
                  value={props.numberRoomAvailable}
                  defaultValue={props.numberRoomAvailable}
                  onChange={(value) => props.setNumberRoomAvailable(value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="numberPeoplePerRoom"
                label="Sức chứa (đơn vị: người/phòng)"
              >
                <InputNumber
                  min={1}
                  value={props.numberPeoplePerRoom}
                  defaultValue={props.numberPeoplePerRoom}
                  onChange={(value) => props.setNumberPeoplePerRoom(value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item name="area" label="Diện tích (đơn vị: m2):">
                <InputNumber
                  min={0}
                  value={props.area}
                  defaultValue={props.area}
                  onChange={(value) => props.setArea(value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn giới tính!",
                  },
                ]}
              >
                <Radio.Group
                  options={props.valueGender}
                  onChange={(e) => props.setGender(e.target.value)}
                  value={props.gender}
                  defaultValue={props.gender}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={4} offset={10}>
              <Button
                type="primary"
                // onClick={(e) => props.nextBack("detail-information")}
                htmlType="submit"
              >
                Tiếp theo
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default CommonInformation;
