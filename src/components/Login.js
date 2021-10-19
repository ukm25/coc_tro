import { createCurrentAccount } from "./commons/Utils";

//react start
import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//react end

//antd start
import { Form, Input, Button, Image, Typography, Row, Col } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
//antd end

//firebase start
import fireStore from "./commons/Firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
//firebase end

const { Title } = Typography;
function Login() {
  let history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const [linkLogo, setLinkLogo] = useState([]);
  useEffect(() => {
    onSnapshot(collection(fireStore, "accounts"), (snapshot) => {
      setAccounts(snapshot.docs.map((doc) => doc.data()));
    });
    const storage = getStorage();
    getDownloadURL(ref(storage, "local/logo.jpg")).then((url) => {
      setLinkLogo(url);
    });
  }, []);

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
          accountsTmp[0].password,
          accountsTmp[0].url
        );
        history.push("/home");
      }
    }
  };

  return (
    <Row
      style={{
        backgroundColor: "#f0f2f5",
        alignItems: "center",
        fontFamily: "Arial",
        minHeight: 600,
        width: "100%",
      }}
    >
      <Col
        xs={{ span: 10, offset: 1 }}
        sm={{ span: 9, offset: 2 }}
        md={{ span: 8, offset: 3 }}
        lg={{ span: 7, offset: 3 }}
        xl={{ span: 6, offset: 4 }}
        xxl={{ span: 5, offset: 5 }}
      >
        <Image style={{ width: "100%" }} src={linkLogo} />
      </Col>

      <Col
        xs={{ span: 10, offset: 2 }}
        sm={{ span: 9, offset: 2 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 7, offset: 4 }}
        xl={{ span: 6, offset: 4 }}
        xxl={{ span: 5, offset: 4 }}
      >
        <Row style={{ width: "100%", height: "100%" }}>
          <Col span={24}>
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              style={{
                boxShadow: "0px 2px 64px rgba(0, 0, 0, 0.2)",
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: 16,
              }}
            >
              <Row style={{ width: "100%", height: "100%" }}>
                <Col span={22} offset={1}>
                  <Form.Item name="title">
                    <Title style={{ fontSize: 30, paddingTop: 20 }}>
                      Đăng nhập
                    </Title>
                  </Form.Item>

                  <Form.Item name="Email" rules={[]}>
                    <Input
                      prefix={<MailOutlined style={{ marginRight: 10 }} />}
                      placeholder="Email"
                      style={{ height: 35 }}
                    />
                  </Form.Item>

                  <Form.Item name="Mật khẩu" rules={[]}>
                    <Input
                      prefix={<LockOutlined style={{ marginRight: 10 }} />}
                      type="password"
                      placeholder="Mật khẩu"
                      style={{ height: 35 }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ fontSize: 15, width: "100%" }}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    Chưa có tài khoản?<a href="/register"> Đăng ký ngay</a>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Login;
