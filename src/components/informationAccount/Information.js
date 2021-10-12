import React, { useState, useEffect, Suspense } from "react";
import PropTypes from "prop-types";
import Introduce from "./Introduce";
import ManagerPost from "./ManagerPost";
import CreatePost from "../post/CreatePost";

import fireStore from "../../firebase/Firebase";
import { onSnapshot, collection } from "firebase/firestore";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Menu, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
Information.propTypes = {};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin key="loading" />;

function Information(props) {
  const [currentAccount, setCurrentAccount] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(fireStore, "currentAccount"), (snapshot) => {
        setCurrentAccount(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );
  return (
    <div
      className="site-layout-background"
      style={{
        marginTop: 24,
        marginLeft: 300,
        marginRight: 300,
        minHeight: 600,
        backgroundColor: "red",
      }}
    >
      <div
        style={{
          marginTop: 24,
          marginLeft: 300,
          marginRight: 300,
          minHeight: 400,
          backgroundColor: "red",
        }}
      >
        Header
      </div>
      <Router key="router-information">
        <Menu
          mode="horizontal"
          key="menu-header"
          style={{ height: 70, justifyContent: "center" }}
        >
          <Menu.Item style={{ display: "inline-flex" }} key="create-new-post">
            <Link to="create-new-post" key="link-create-new-post" onClick={() => setIsModalVisible(true)}>
              Tạo bài đăng
            </Link>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Menu.Item>
          <Menu.Item style={{ display: "inline-flex" }} key="manager-post">
            <Link to="manager-post" key="link-manager-post">
              Quản lý bài đăng
            </Link>
          </Menu.Item>
          <Menu.Item style={{ display: "inline-flex" }} key="introduce">
            <Link to="introduce" key="link-introduce">
              Giới thiệu
            </Link>
          </Menu.Item>
        </Menu>
        <Suspense
          key="suspense"
          style={{}}
          fallback={<Spin indicator={antIcon} key="spin" />}
        >
          <Switch orientation="right" key="switch">
            <Route
              key="create-new-post"
              path="/create-new-post"
              component={CreatePost}
            />
            <Route
              key="manager-post"
              path="/manager-post"
              component={ManagerPost}
            />
            <Route key="introduce" path="/introduce" component={Introduce} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default Information;
