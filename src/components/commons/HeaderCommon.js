// import "./Commons.css";
import React, { Suspense, useState } from "react";
import { Menu } from "antd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "antd/dist/antd.css";

const Login = React.lazy(() => import("../login/Login"));
const CreatePost = React.lazy(() => import("../post/CreatePost"));
// const Error = React.lazy(() => import("./Error"));
const Register = React.lazy(() => import("../register/Register"));
const Home = React.lazy(() => import("../home/Home"));


function HeaderCommon() {
  const [currentAccount, setCurrentAccount] = useState(window.localStorage.getItem("currentAccount"))
  const Logout = () => {
    if(window.localStorage.getItem('currentAccount')) {
      window.localStorage.removeItem('currentAccount');
    }
    setCurrentAccount(window.localStorage.getItem("currentAccount"));
  }

  return (
    
    <Router>
      <Menu mode="horizontal">
        <Menu.Item key="home">Home</Menu.Item>
        { currentAccount ? (
          <Menu.Item>
            <Link to="create-new-post">Tạo bài đăng</Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link></Link>
          </Menu.Item>
        )}
        { currentAccount ? (
          <Menu.Item>
            <Link>Quản lý bài đăng</Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link></Link>
          </Menu.Item>
        )}
        <Menu.Item key="login-logout" className="login_logout_button">
          {
            currentAccount ?  (
              // <a onClick={Logout} href="">Đăng xuất</a>
              <Link onClick={Logout} to="/home">Đăng xuất</Link>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )
          }
        </Menu.Item>
      </Menu>
      <Suspense fallback={<div>Loading...</div>}>
      <Switch orientation="right">
      <Route path="/home" component={Home} />
        <Route path="/login" 
            render={(props) => {
              if(currentAccount) {
                return <Home />
              } else {
                return <Login setCurrentAccount={setCurrentAccount} />;
              }
            }}
         />
         
         <Route path="/create-new-post" component={CreatePost} />
        <Route path="/register" component={Register} />
        {/* <Route path="/:somestring" component={Error} /> */}
      </Switch>
      </Suspense>
    </Router>
  );
}

export default HeaderCommon;
