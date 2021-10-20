import React, { useMemo } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Col,
  Row,
  Typography,
  Cascader,
} from "antd";

// const UploadImage = React.lazy(() => import("./UpdateImage"));
const LocationPicker = React.lazy(() => import("../commons/LocationPicker"));
const loadLocation = React.lazy(() => import("../commons/Location"));
function DetailInformation(props) {
  const Title = Typography;
  const onFinish = (value) => {
    nextBack("post-information");
  };
  const roomType = props.roomType;
  let unitPrice = "VNĐ/người";
  if (roomType === "Ký túc xá") {
    unitPrice = "(đơn vị:VND/người)";
  } else if (roomType === "Phòng trọ cho thuê") {
    unitPrice = "(đơn vị: VND/phòng)";
  } else if (roomType === "Nhà nguyên căn" || roomType === "Chung cư mini") {
    unitPrice = "(đơn vị: VND/căn)";
  } else {
    unitPrice = "";
  }

  let {
    formItemLayout,
    rentPrice,
    setRentPrice,
    deposit,
    setDeposit,
    electricPrice,
    setElectricPrice,
    waterPrice,
    setWaterPrice,
    internetPrice,
    setInternetPrice,
    cleanPrice,
    setCleanPrice,
    detailAddress,
    setDetailAddress,
    tailFormItemLayout,
    utilities,
    setChosenUtilities,
    chosenUtilities,
    nextBack,
    chosenLocation,
    setChosenLocation,
  } = props;

  const titleMemo = useMemo(() => {
    return (
      <Form.Item name="title">
        <Title style={{ fontSize: 30 }}>Thông tin chi tiết:</Title>
      </Form.Item>
    );
  }, []);

  const rentPriceMemo = useMemo(() => {
    return (
      <Form.Item
        name="rentPrice"
        label={"Giá cho thuê:"}
        rules={[
          {
            required: !rentPrice,
            message: "Hãy nhập giá cho thuê",
          },
        ]}
      >
        <Row>
          <Col span={15}>
            <Input
              placeholder={"đơn vị: VNĐ/" + unitPrice}
              value={rentPrice}
              defaultValue={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [setRentPrice, rentPrice, unitPrice]);

  const depositMemo = useMemo(() => {
    return (
      <Form.Item
        name="deposit"
        label="Giá tiền đặt cọc"
        rules={[
          {
            required: !deposit,
            message: "Hãy nhập giá cọc",
          },
        ]}
      >
        <Row>
          <Col span={15}>
            <Input
              placeholder="đơn vị: VNĐ"
              value={deposit}
              defaultValue={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [setDeposit, deposit]);

  const electricPriceMemo = useMemo(() => {
    return (
      <Form.Item
        name="electric"
        label="Giá điện:"
        rules={[
          {
            required: !electricPrice,
            message: "Hãy nhập giá điện",
          },
        ]}
      >
        <Row>
          <Col span={15}>
            <Input
              placeholder="đơn vị: VNĐ/số"
              value={electricPrice}
              defaultValue={electricPrice}
              onChange={(e) => setElectricPrice(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [electricPrice, setElectricPrice]);

  const waterPriceMemo = useMemo(() => {
    return (
      <Form.Item
        label="Giá nước:"
        name="water"
        rules={[
          {
            required: !waterPrice,
            message: "Hãy nhập giá nước",
          },
        ]}
      >
        <Row>
          <Col span={15}>
            <Input
              placeholder="đơn vị: VNĐ/khối"
              value={waterPrice}
              defaultValue={waterPrice}
              onChange={(e) => setWaterPrice(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [waterPrice, setWaterPrice]);

  const internetPriceMemo = useMemo(() => {
    return (
      <Form.Item
        label="Giá internet:"
        name="internet"
        rules={[
          {
            required: !internetPrice,
            message: "Hãy nhập giá internet",
          },
        ]}
      >
        <Row>
          <Col span={15}>
            <Input
              placeholder="đơn vị: VNĐ/tháng"
              value={internetPrice}
              defaultValue={internetPrice}
              onChange={(e) => setInternetPrice(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [internetPrice, setInternetPrice]);

  const cleanPriceMemo = useMemo(() => {
    return (
      <Form.Item
        name="clean"
        label="Chi phí vệ sinh"
        rules={[
          {
            required: !cleanPrice,
            message: "Hãy nhập giá vệ sinh",
          },
        ]}
      >
        <Row>
          <Col span={15}>
            <Input
              placeholder="đơn vị: VNĐ/tháng"
              value={cleanPrice}
              defaultValue={cleanPrice}
              onChange={(e) => setCleanPrice(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [cleanPrice, setCleanPrice]);

  const locationMemo = useMemo(() => {
    return (
      <Form.Item
        label="Địa chỉ"
        name="location"
        rules={[{ type: "array", required: true, message: "Hãy chọn địa chỉ" }]}
      >
        <Row>
          <Col span={15}>
            <LocationPicker
              chosenLocation={[...chosenLocation]}
              setChosenLocation={setChosenLocation}
            />
            {/* <Cascader options={loadLocation} /> */}
            {/* <Cascader
              placeholder="Quận,Huyện/Phường,Xã"
              onChange={(value, selectedOptions) => {
                let tempLocation = [];
                selectedOptions.forEach((option) => {
                  tempLocation = [...tempLocation, option.value];
                });
                setChosenLocation(tempLocation);
              }}
              options={loadLocation}
              defaultValue={chosenLocation}
            /> */}
          </Col>
        </Row>
      </Form.Item>
    );
  }, [chosenLocation, setChosenLocation]);

  const locationDetailMemo = useMemo(() => {
    return (
      <Form.Item label="Địa chỉ chi tiết:">
        <Row>
          <Col span={15}>
            <Input
              placeholder="Đường,số nhà, thôn xóm,..."
              value={detailAddress}
              defaultValue={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [detailAddress, setDetailAddress]);

  const imageMemo = useMemo(() => {
    return (
      <Form.Item {...tailFormItemLayout} label="Ảnh minh hoạ:" name="image">
        {/* <UploadImage
fileList={[...props.fileList]}
setFileList={props.setFileList}
/> */}
        <p>
          *Đăng nhiều hình ảnh sẽ giúp bài đăng hấp dẫn hơn với người tìm trọ*
        </p>
      </Form.Item>
    );
  }, [tailFormItemLayout]);

  const utilitiesMemo = useMemo(() => {
    return (
      <Form.Item label="Tiện ích" name="utilities" rules={[]}>
        <Row>
          <Col span={20}>
            <Checkbox.Group
              className="checkbox-utilities"
              id="checkbox-utilities"
              options={utilities}
              onChange={(checkedValue) => setChosenUtilities(checkedValue)}
              defaultValue={[...chosenUtilities]}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  }, [chosenUtilities, setChosenUtilities, utilities]);

  const buttonsMemo = useMemo(() => {
    return (
      <Form.Item>
        <Row>
          <Col span={15}>
            <Button
              type="primary"
              onClick={(e) => nextBack("common-information")}
            >
              Quay lại
            </Button>
            <Button type="primary" htmlType="submit">
              Tiếp theo
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }, [nextBack]);
  return (
    <Row>
      <Col span={22} offset={1}>
        <Form {...formItemLayout} onFinish={(value) => onFinish(value)}>
          <Row style={{ marginBottom: 30 }}>
            <Col style={{ width: "100%" }}>{titleMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{rentPriceMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{depositMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{electricPriceMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{waterPriceMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{internetPriceMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{cleanPriceMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{locationMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{locationDetailMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{imageMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{utilitiesMemo}</Col>
          </Row>

          <Row>
            <Col style={{ width: "100%" }}>{buttonsMemo}</Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default DetailInformation;
