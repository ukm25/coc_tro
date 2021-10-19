import { deleteCurrentAccount } from "./Utils";

//react start
import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//react end

//antd start
import { Menu, Spin, Dropdown, Button, Avatar, Input, Col, Row } from "antd";
import {
  LoadingOutlined,
  MessageTwoTone,
  NotificationTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
//antd end

//firebase start
import fireStore from "./Firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
//firebase end

const Login = React.lazy(() => import("../Login"));
const Register = React.lazy(() => import("../Register"));
const Home = React.lazy(() => import("../Home"));
const Information = React.lazy(() => import("../Information"));

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin key="loading" />;

function HeaderCommon() {
  const [currentAccount, setCurrentAccount] = useState([]);
  const [linkLogo, setLinkLogo] = useState([]);
  useEffect(() => {
    onSnapshot(collection(fireStore, "currentAccount"), (snapshot) => {
      setCurrentAccount(snapshot.docs.map((doc) => doc.data()));
    });

    const storage = getStorage();
    getDownloadURL(ref(storage, "local/logo.jpg")).then((url) => {
      setLinkLogo(url);
    });
  }, []);

  const menuMessage = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  const menuNotification = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <Router key="router">
      <Menu
        mode="horizontal"
        key="menu-header"
        style={{ maxHeight: 55, justifyContent: "center", width: "100%" }}
      >
        <Row style={{ width: "100%" }}>
          <Col
            xs={{ span: 12, offset: 0 }}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 10, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            xxl={{ span: 4, offset: 0 }}
          >
            <Row>
              <Col
                xs={{ span: 1, offset: 1 }}
                sm={{ span: 1, offset: 1 }}
                md={{ span: 1, offset: 1 }}
                lg={{ span: 2, offset: 2 }}
                xl={{ span: 2, offset: 2 }}
                xxl={{ span: 2, offset: 2 }}
              >
                <Menu.Item
                  style={{ display: "inline-flex", padding: 0 }}
                  key="Home-Search"
                >
                  <Link to="/home">
                    <Avatar src={linkLogo} size={"100%"} />
                  </Link>
                </Menu.Item>
              </Col>
              <Col xs={{ span: 20, offset: 2 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 18, offset: 2 }}
                xl={{ span: 18, offset: 2 }}
                xxl={{ span: 18, offset: 2 }}>
                <Menu.Item style={{ display: "inline-flex", padding: 0 }}>
                  <Input
                    prefix={<SearchOutlined style={{ marginRight: 10 }} />}
                    placeholder="Tìm kiếm trên Cóc Trọ"
                    size={"100%"}
                    style={{
                      borderRadius: 16,
                      // width: 230,
                      // height: 35,
                      // marginLeft: 10,
                    }}
                  />
                </Menu.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 12, offset: 0 }}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 10, offset: 4 }}
            lg={{ span: 8, offset: 8}}
            xl={{ span: 6, offset: 12 }}
            xxl={{ span: 4, offset: 16 }}>
            {currentAccount.length === 0 ? (
              <Link to="" key="null"></Link>
            ) : (
              <>
                <Menu.Item
                  key="account-information"
                  style={{
                    display: "inline-flex",
                    height: 30,
                    marginRight: 5,
                    padding: 0,
                  }}
                >
                  <Link to="/information">
                    <Button
                      style={{
                        borderRadius: 16,
                        backgroundColor: "#f0f2f5",
                        padding: 0,
                        paddingRight: 5,
                        height: 35,
                      }}
                    >
                      <Avatar
                        src="https://scontent.fhan5-7.fna.fbcdn.net/v/t1.6435-9/148236035_431288688121126_7347836499274082866_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=q2UzOGjWIq8AX8Z1B9F&_nc_ht=scontent.fhan5-7.fna&oh=f7dca890ee6a507f26b2d85992e9b46a&oe=618CCC0F"
                        style={{ marginRight: 5 }}
                      />
                      {currentAccount[0].fullname}
                    </Button>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  style={{ display: "inline-flex", marginRight: 5, padding: 0 }}
                >
                  <Dropdown overlay={menuMessage} trigger={["click"]}>
                    <Button
                      style={{
                        backgroundColor: "#f0f2f5",
                        padding: 0,
                        borderRadius: 50,
                        height: 35,
                        width: 35,
                      }}
                    >
                      <MessageTwoTone />
                    </Button>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item
                  style={{ display: "inline-flex", marginRight: 5, padding: 0 }}
                >
                  <Dropdown overlay={menuNotification} trigger={["click"]}>
                    <Button
                      style={{
                        backgroundColor: "#f0f2f5",
                        padding: 0,
                        borderRadius: 50,
                        height: 35,
                        width: 35,
                      }}
                    >
                      <NotificationTwoTone />
                    </Button>
                  </Dropdown>
                </Menu.Item>
              </>
            )}

            <Menu.Item
              key="login-logout"
              style={{ display: "inline-flex", padding: 0 }}
            >
              {currentAccount.length === 0 ? (
                <Link to="/login">
                  <Button
                    style={{
                      paddingLeft: 5,
                      borderRadius: 16,
                      backgroundColor: "#f0f2f5",
                      paddingRight: 5,
                      height: 35,
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
              ) : (
                <Link to="/home" onClick={() => deleteCurrentAccount()}>
                  <Button
                    style={{
                      paddingLeft: 5,
                      borderRadius: 16,
                      backgroundColor: "#f0f2f5",
                      paddingRight: 5,
                      height: 35,
                    }}
                  >
                    Đăng xuất
                  </Button>
                </Link>
              )}
            </Menu.Item>
          </Col>
        </Row>
      </Menu>

      <Suspense
        key="suspense"
        fallback={<Spin indicator={antIcon} key="spin" />}
      >
        <Switch orientation="right" key="switch">
          <Route key="home" path="/home" component={Home} />
          <Route key="login" path="/login" component={Login} />

          <Route
            key="information"
            path="/information"
            component={Information}
          />
          <Route key="register" path="/register" component={Register} />
          {/* <Route path="/:somestring" component={Error} /> */}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default HeaderCommon;
