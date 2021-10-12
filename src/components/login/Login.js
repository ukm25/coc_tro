import "./Login.css";
import { createCurrentAccount } from "../commons/Utils";

//react start
import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//react end

//antd start
import { Form, Input, Button, Image, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
//antd end

//firebase start
import fireStore from "../../firebase/Firebase";
import { onSnapshot, collection } from "firebase/firestore";
import HeaderCommon from "../commons/HeaderCommon";
//firebase end

const { Title } = Typography;
function Login() {
  let history = useHistory();
  const [accounts, setAccounts] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(fireStore, "accounts"), (snapshot) => {
        setAccounts(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  const onFinish = (values) => {
    let accountsTmp = accounts.filter(
      (account) => account.email === values["Email"]
    );
    if (accountsTmp.length === 0) {
      //email wrong
      alert("Tài khoản không tồn tài");
    } else {
      accountsTmp = accountsTmp.filter(
        (account) => account.password === values["Mật khẩu"]
      );
      if (accountsTmp.length === 0) {
        //password wrong
        alert("Mật khẩu không chính xác");
      } else {
        //login success
        alert("Đăng nhập thành công");

        //add account to currentAccount
        createCurrentAccount(
          accountsTmp[0].email,
          accountsTmp[0].fullname,
          accountsTmp[0].password
        );
        history.push("/home");
      }
    }
  };

  return (
    <>
    {/* <HeaderCommon/> */}
    <div className="login-container">
      <Image
        className="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="title">
            <Title>Đăng nhập</Title>
          </Form.Item>

          <Form.Item name="Email" rules={[]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="Mật khẩu" rules={[]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            Chưa có tài khoản?<a href="/register"> Đăng ký ngay</a>
          </Form.Item>
        </Form>
      
    </div>
    </>
    
  );
}

export default Login;
