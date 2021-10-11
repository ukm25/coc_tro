import "./CreatePost.css";
import React, { useState, Suspense } from "react";

import DetailInformation from "./DetailInformation";
import PostInformation from "./PostInformation";
const CommonInformation = React.lazy(() => import("./CommonInformation"));

function CreatePost(props) {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  //Post Type - Start
  const [postType, setPostType] = useState("");
  const valuePostType = ["Tìm ở ghép", "Cho thuê trọ"];
  //Post Type - End
  //Room Type - Start
  const [roomType, setRoomType] = useState("");
  const valueRoomType = [
    "Ký túc xá",
    "Phòng trọ cho thuê",
    "Nhà nguyên căn",
    "Chung cư mini",
  ];
  //Room Type - End
  //Number Room Name - Start
  const [roomName, setRoomName] = useState("");
  //Number Room Name - End
  //Number Room Available - Start
  const [numberRoomAvailable, setNumberRoomAvailable] = useState(3);
  //Number Room Available - End
  //Number Person Per Room - Start
  const [numberPeoplePerRoom, setNumberPeoplePerRoom] = useState(2);
  //Number Person Per Room - End
  //Gender - Start
  const [gender, setGender] = useState("");
  const valueGender = ["Tất cả", "Nam", "Nữ"];
  //Gender - End

  //Rent Price - Start
  const [rentPrice, setRentPrice] = useState([0.5, 2]);
  //Rent Price - End
  //Deposit - Start
  const [deposit, setDeposit] = useState("");
  //Deposit - End
  //Electric Price - Start
  const [electricPrice, setElectricPrice] = useState("");
  //Electric Price - End
  //Water Price - Start
  const [waterPrice, setWaterPrice] = useState("");
  //Water Price - End
  //Internet Price - Start
  const [internetPrice, setInternetPrice] = useState("");
  //Internet Price - End
  //clean Price - Start
  const [cleanPrice, setCleanPrice] = useState("");
  //clean Price - End
  //Address -Start
  const [chosenLocation, setChosenLocation] = useState([]);
  const [detailAddress, setDetailAddress] = useState("");
  //Address-end
  //Utilities - Start
  const utilities = [
    { label: "WC riêng", value: "WC riêng" },
    { label: "Cửa sổ", value: "Cửa sổ" },
    { label: "Chủ riêng", value: "Chủ riêng" },
    { label: "Bình nóng lạnh", value: "Bình nóng lạnh" },
    { label: "Tủ lạnh", value: "Tủ lạnh" },
    { label: "Gác lửng", value: "Gác lửng" },
    { label: "Tủ đồ", value: "Tủ đồ" },
    { label: "Thú cưng", value: "Thú cưng" },
    { label: "Bảo vệ", value: "Bảo vệ" },
    { label: "Camera an ninh", value: "Camera an ninh" },
    { label: "Điều hoà", value: "Điều hoà" },
    { label: "Nhà bếp", value: "Nhà bếp" },
    { label: "Máy giặt", value: "Máy giặt" },
    { label: "Giường", value: "Giường" },
    { label: "Tivi", value: "Tivi" },
    { label: "Ban công", value: "Ban công" },
  ];
  const [chosenUtilities, setChosenUtilities] = useState([]);
  //Utilities - End
  //Phone - Start
  const [phone, setPhone] = useState();
  //Phone - End
  //Contact-start
  const [contact, setContact] = useState();
  //contact-end
  //Title - Start
  const [title, setTitle] = useState("");
  //Title - End

  //Description - Start
  const [description, setDescription] = useState("");
  //Description - End

  //Strict Time - Start
  const [strictTime, setStrictTime] = useState("Không");
  const [strictTimeStart, setStrictTimeStart] = useState("");
  const [strictTimeEnd, setStrictTimeEnd] = useState("");

  const valueStrictTime = ["Có", "Không"];
  //Strict Time - End

  //image -start
  const [fileList, setFileList] = useState([]);
  //image -end
  //room area - start
  const [area, setArea] = useState(0);
  //room area -end

  const nextBack = function (visit) {
    if (visit === "detail-information") {
      setFormShow("detail-information");
    }
    if (visit === "common-information") {
      setFormShow("common-information");
    }
    if (visit === "post-information") {
      setFormShow("post-information");
    }
  };

  const [formShow, setFormShow] = useState("common-information");
  const changeForm = (formShowTmp) => {
    if (formShowTmp === "common-information") {
      return (
        <CommonInformation
          formItemLayout={formItemLayout}
          valuePostType={valuePostType}
          setPostType={setPostType}
          postType={postType}
          valueRoomType={valueRoomType}
          setRoomType={setRoomType}
          roomType={roomType}
          numberRoomAvailable={numberRoomAvailable}
          setNumberRoomAvailable={setNumberRoomAvailable}
          numberPeoplePerRoom={numberPeoplePerRoom}
          setNumberPeoplePerRoom={setNumberPeoplePerRoom}
          valueGender={valueGender}
          setGender={setGender}
          gender={gender}
          tailFormItemLayout={tailFormItemLayout}
          nextBack={nextBack}
          area={area}
          setArea={setArea}
          roomName={roomName}
          setRoomName={setRoomName}
        />
      );
    }

    if (formShowTmp === "detail-information") {
      return (
        <DetailInformation
          formItemLayout={formItemLayout}
          roomType={roomType}
          rentPrice={rentPrice}
          setRentPrice={setRentPrice}
          deposit={deposit}
          setDeposit={setDeposit}
          electricPrice={electricPrice}
          setElectricPrice={setElectricPrice}
          waterPrice={waterPrice}
          setWaterPrice={setWaterPrice}
          internetPrice={internetPrice}
          setInternetPrice={setInternetPrice}
          cleanPrice={cleanPrice}
          setCleanPrice={setCleanPrice}
          utilities={utilities}
          chosenUtilities={[...chosenUtilities]}
          setChosenUtilities={setChosenUtilities}
          tailFormItemLayout={tailFormItemLayout}
          nextBack={nextBack}
          fileList={[...fileList]}
          setFileList={setFileList}
          setChosenLocation={setChosenLocation}
          chosenLocation={[...chosenLocation]}
          detailAddress={detailAddress}
          setDetailAddress={setDetailAddress}
        />
      );
    }

    return (
      <PostInformation
        formItemLayout={formItemLayout}
        // onFinish={onFinish}
        phone={phone}
        contact={contact}
        setContact={setContact}
        setPhone={setPhone}
        title={title}
        roomName={roomName}
        description={description}
        setDescription={setDescription}
        setTitle={setTitle}
        valueStrictTime={valueStrictTime}
        setStrictTime={setStrictTime}
        strictTime={strictTime}
        strictTimeStart={strictTimeStart}
        strictTimeEnd={strictTimeEnd}
        setStrictTimeStart={setStrictTimeStart}
        setStrictTimeEnd={setStrictTimeEnd}
        tailFormItemLayout={tailFormItemLayout}
        nextBack={nextBack}
      />
    );
  };
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{changeForm(formShow)}</Suspense>
    </div>
  );
}

export default CreatePost;
