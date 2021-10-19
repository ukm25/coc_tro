//react start
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//react end

import Introduce from "./Introduce";
import ManagerPost from "./ManagerPost";
import CreatePost from "./post/CreatePost";

//antd start
import { Menu, Spin, Image, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
//antd end

import fireStore from "./commons/Firebase";
import { onSnapshot, collection } from "firebase/firestore";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin key="loading" />;

function Information(props) {
  const [currentAccount, setCurrentAccount] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(fireStore, "currentAccount"), (snapshot) => {
        setCurrentAccount(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );
  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 18, offset: 3 }}
        xl={{ span: 16, offset: 4 }}
        xxl={{ span: 14, offset: 5 }}
      >
        {currentAccount.length === 0 ? (
          <></>
        ) : (
          <div
            className="cover-image"
            style={{
              maxHeight: 400,
              overflow: "hidden",
            }}
          >
            <Image src={currentAccount[0].url} style={{ maxWidth: "100%" }} />
          </div>
        )}
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 22, offset: 1 }}
            md={{ span: 22, offset: 1 }}
            lg={{ span: 22, offset: 1 }}
            xl={{ span: 22, offset: 1 }}
            xxl={{ span: 22, offset: 1 }}
          >
            <Router key="router-information">
              <Menu
                mode="horizontal"
                key="menu-header"
                style={{
                  height: 50,
                  justifyContent: "center",
                  
                }}
              >
                <Row style={{ width: "100%" }}>
                  <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 6, offset: 1 }}
                    md={{ span: 6, offset: 2 }}
                    lg={{ span: 4, offset: 5 }}
                    xl={{ span: 4, offset: 5 }}
                    xxl={{ span: 4, offset: 5 }}
                    style={{ textAlign: "center" }}
                  >
                    <Menu.Item
                      style={{ display: "inline-flex", padding: 0 }}
                      key="create-new-post"
                    >
                      <Link to="create-new-post" key="link-create-new-post">
                        Tạo bài đăng
                      </Link>
                    </Menu.Item>
                  </Col>
                  <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 6, offset: 1 }}
                    md={{ span: 6, offset: 1 }}
                    lg={{ span: 4, offset: 1 }}
                    xl={{ span: 4, offset: 1 }}
                    xxl={{ span: 4, offset: 1 }}
                    style={{ textAlign: "center" }}
                  >
                    <Menu.Item
                      style={{ display: "inline-flex" }}
                      key="manager-post"
                    >
                      <Link to="manager-post" key="link-manager-post">
                        Quản lý bài đăng
                      </Link>
                    </Menu.Item>
                  </Col>
                  <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 6, offset: 1 }}
                    md={{ span: 6, offset: 1 }}
                    lg={{ span: 4, offset: 1 }}
                    xl={{ span: 4, offset: 1 }}
                    xxl={{ span: 4, offset: 1 }}
                    style={{ textAlign: "center" }}
                  >
                    <Menu.Item
                      style={{ display: "inline-flex" }}
                      key="introduce"
                    >
                      <Link to="introduce" key="link-introduce">
                        Chỉnh sửa thông tin
                      </Link>
                    </Menu.Item>
                  </Col>
                </Row>
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
                  <Route
                    key="introduce"
                    path="/introduce"
                    component={Introduce}
                  />
                </Switch>
              </Suspense>
            </Router>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Information;
