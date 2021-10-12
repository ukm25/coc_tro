import "./commons.css";
import { deleteCurrentAccount } from "./Utils";

//react start
import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//react end

//antd start
import {
  Menu,
  Divider,
  Spin,
  Layout,
  Dropdown,
  Button,
  Avatar,
  Input,
} from "antd";
import {
  LoadingOutlined,
  MessageTwoTone,
  NotificationTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
//antd end

//firebase start
import fireStore from "../../firebase/Firebase";
import { onSnapshot, collection } from "firebase/firestore";
//firebase end

const { SubMenu } = Menu;
const { Content } = Layout;

const Login = React.lazy(() => import("../login/Login"));
const CreatePost = React.lazy(() => import("../post/CreatePost"));
// const Error = React.lazy(() => import("./Error"));
const Register = React.lazy(() => import("../register/Register"));
const Home = React.lazy(() => import("../home/Home"));
const Information = React.lazy(() =>
  import("../informationAccount/Information")
);

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin key="loading" />;

function HeaderCommon() {
  const [currentAccount, setCurrentAccount] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(fireStore, "currentAccount"), (snapshot) => {
        setCurrentAccount(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

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
        style={{ height: 70, justifyContent: "center" }}
      >
        <Divider
          key="divider-left"
          orientation="left"
          type="horizontal"
          style={{ minWidth: 0, display: "flex" }}
        >
          <Menu.Item style={{ display: "inline-flex" }} key="create-new-post">
            <Avatar size={25} icon="user" style={{ marginRight: 5 }} />
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm trên Cóc Trọ"
              style={{ borderRadius: 16, width:200 }}
            />
          </Menu.Item>
          
        </Divider>
        {/* <Divider orientation="center" key="divider-center">Khuyến mãiTrang chủ</Divider> */}
        <Divider orientation="right" key="divider-right">
          {currentAccount.length === 0 ? (
            <Link to="" key="null"></Link>
          ) : (
            <>
              <Menu.Item
                key="account-information"
                style={{ display: "inline-flex", height: 30 }}
              >
                <Link to="/information">
                  <Button style={{ borderRadius: 16 }}>
                    <Avatar size={25} icon="user" style={{ marginRight: 5 }} />
                    {currentAccount[0].fullname}
                  </Button>
                </Link>
              </Menu.Item>

              <Menu.Item style={{ display: "inline-flex" }}>
                <Dropdown overlay={menuMessage} trigger={["click"]}>
                  <Button style={{ borderRadius: 16 }}>
                    <MessageTwoTone style={{ fontSize: "150%" }} />
                  </Button>
                </Dropdown>
              </Menu.Item>
              <Menu.Item style={{ display: "inline-flex" }}>
                <Dropdown overlay={menuNotification} trigger={["click"]}>
                  <Button style={{ borderRadius: 16 }}>
                    <NotificationTwoTone style={{ fontSize: "150%" }} />
                  </Button>
                </Dropdown>
              </Menu.Item>
            </>
          )}

          <Menu.Item
            key="login-logout"
            className="login_logout_button"
            style={{ display: "inline-flex" }}
          >
            {currentAccount.length === 0 ? (
              <Link to="/login">
                <Button style={{ borderRadius: 16 }}>Đăng nhập</Button>
              </Link>
            ) : (
              <Link to="/home" onClick={() => deleteCurrentAccount()}>
                <Button style={{ borderRadius: 16 }}>Đăng xuất</Button>
              </Link>
            )}
          </Menu.Item>
        </Divider>
      </Menu>
      <Suspense
        key="suspense"
        style={{}}
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
      {/* <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      ></Content> */}
    </Router>
  );
}

export default HeaderCommon;
