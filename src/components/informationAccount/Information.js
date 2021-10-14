import "./Information.css";

//react start
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//react end

import Introduce from "./Introduce";
import ManagerPost from "./ManagerPost";
import CreatePost from "../post/CreatePost";

//antd start
import { Menu, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
//antd end

import storage from "../../firebase/Firebase";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin key="loading" />;

function Information(props) {

  // const link = storage.child(`anhbia.jpg`).getDownloadURL();
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
        {/* <image src={link}/> */}
      </div>


      <Router key="router-information">
        <Menu
          mode="horizontal"
          key="menu-header"
          style={{ height: 70, justifyContent: "center" }}
        >
          <Menu.Item style={{ display: "inline-flex" }} key="create-new-post">
            <Link to="create-new-post" key="link-create-new-post">
              Tạo bài đăng
            </Link>
          </Menu.Item>
          <Menu.Item style={{ display: "inline-flex" }} key="manager-post">
            <Link to="manager-post" key="link-manager-post">
              Quản lý bài đăng
            </Link>
          </Menu.Item>
          <Menu.Item style={{ display: "inline-flex" }} key="introduce">
            <Link to="introduce" key="link-introduce">
            Chỉnh sửa thông tin
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
              key="manager-post"
              path="/manager-post"
              component={ManagerPost}
            />
            <Route
              key="create-new-post"
              path="/create-new-post"
              component={CreatePost}
            />
            <Route key="introduce" path="/introduce" component={Introduce} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default Information;
