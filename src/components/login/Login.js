import React from "react";
import "./Login.css";
import { Form, Input, Button, Image } from "antd";
import { useHistory } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

function Login(props) {
  let history = useHistory();
  const onFinish = (values) => {
    // localStorage.clear();

    // console.log(localStorage);


    // let accounts1 = [];
    // accounts1[0] = ["quang251199@gmail.com", "123456"];
    // localStorage.setItem("accounts", JSON.stringify(accounts1));

    // var storedNames = JSON.parse(localStorage.getItem("names"));
    // storedNames.forEach(name => {
    //   if(name[0] === "quang") {
    //     console.log("ngon")
    //   }
    // });
    // console.log(storedNames)
    
    
    let accounts = JSON.parse(window.localStorage.getItem("accounts"));
    accounts.forEach((account) => {
      if (account[0] === values["Email"]) {
        //have account
        if (account[1] === values["Mật khẩu"]) {
          //password correct
          alert("Đăng nhập thành công!");
          window.localStorage.setItem("currentAccount", account[0]);
          props.setCurrentAccount(window.localStorage.getItem("currentAccount"));
          history.push("/home");
        } else {
          //password wrong
          alert("Mật khẩu không chính xác!");
        }
      } else {
        //don't have account
        alert("Không tồn tại tài khoản này!");
      }
    });
  };

  // const onFinishFailed = (errorInfo: any) => {

  // };

  return (
    <div className="login-container">
      <Image
        className="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <div className="container-form-login">
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <div className="login-label">
              <span>Đăng nhập</span>
            </div>
          </Form.Item>
          <Form.Item name="Email" rules={[]}>
            <div className="login-input">
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </div>
          </Form.Item>

          <Form.Item name="Mật khẩu" rules={[]}>
            <div className="login-input">
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <p>
              Chưa có tài khoản?<a href="/register"> Đăng ký ngay</a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;