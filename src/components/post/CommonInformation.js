import React, { useMemo } from "react";

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
  let {
    postType,
    valuePostType,
    setPostType,
    valueRoomType,
    setRoomType,
    roomType,
    roomName,
    setRoomName,
    numberRoomAvailable,
    setNumberRoomAvailable,
    numberPeoplePerRoom,
    setNumberPeoplePerRoom,
    area,
    setArea,
    valueGender,
    setGender,
    gender,
    nextBack,
  } = props;

  const onFinish = (value) => {
    nextBack("detail-information");
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
            required: !postType,
            message: "Hãy chọn loại hình!",
          },
        ]}
      >
        <Radio.Group
          options={valuePostType}
          onChange={(e) => setPostType(e.target.value)}
          value={postType}
          defaultValue={postType}
        />
      </Form.Item>
    );
  }, [postType, valuePostType, setPostType]);

  const roomTypeMemo = useMemo(() => {
    return (
      <Form.Item
        name="roomType"
        label="Loại phòng"
        rules={[
          {
            required: !roomType,
            message: "Hãy chọn loại phòng!",
          },
        ]}
      >
        <Radio.Group
          options={valueRoomType}
          onChange={(e) => setRoomType(e.target.value)}
          value={roomType}
          defaultValue={roomType}
        />
      </Form.Item>
    );
  }, [valueRoomType, setRoomType, roomType]);

  const nameMemo = useMemo(() => {
    return (
      <Form.Item
        name="name"
        label="Tên trọ:"
        rules={[
          {
            required: !roomName,
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
              value={roomName}
              defaultValue={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [setRoomName, roomName]);

  const numberRoomAvailableMemo = useMemo(() => {
    return (
      <Form.Item
        name="numberRoomAvailable"
        label="Số lượng phòng trống (đơn vị: phòng)"
      >
        <InputNumber
          min={0}
          value={numberRoomAvailable}
          defaultValue={numberRoomAvailable}
          onChange={(value) => setNumberRoomAvailable(value)}
        />
      </Form.Item>
    );
  }, [numberRoomAvailable, setNumberRoomAvailable]);

  const numberPeoplePerRoomMemo = useMemo(() => {
    return (
      <Form.Item
        name="numberPeoplePerRoom"
        label="Sức chứa (đơn vị: người/phòng)"
      >
        <InputNumber
          min={1}
          value={numberPeoplePerRoom}
          defaultValue={numberPeoplePerRoom}
          onChange={(value) => setNumberPeoplePerRoom(value)}
        />
      </Form.Item>
    );
  }, [setNumberPeoplePerRoom, numberPeoplePerRoom]);

  const areaMemo = useMemo(() => {
    return (
      <Form.Item name="area" label="Diện tích (đơn vị: m2):">
        <InputNumber
          min={0}
          value={area}
          defaultValue={area}
          onChange={(value) => setArea(value)}
        />
      </Form.Item>
    );
  }, [area, setArea]);

  const genderMemo = useMemo(() => {
    return (
      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[
          {
            required: !gender,
            message: "Hãy chọn giới tính!",
          },
        ]}
      >
        <Radio.Group
          options={valueGender}
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          defaultValue={gender}
        />
      </Form.Item>
    );
  }, [valueGender, setGender, gender]);

  const buttonMemo = useMemo(() => {
    return (
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tiếp theo
        </Button>
      </Form.Item>
    );
  }, []);
  return (
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
            <Col style={{ width: "100%" }}>{nameMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{numberRoomAvailableMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{numberPeoplePerRoomMemo}</Col>
          </Row>
          <Row>
            <Col style={{ width: "100%" }}>{areaMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{genderMemo}</Col>
          </Row>

          <Row>
            <Col span={4} offset={10}>
              {buttonMemo}
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default CommonInformation;
