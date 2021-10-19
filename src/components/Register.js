import { createAccount } from "../components/commons/Utils";

// react start
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//react end

//antd start
import { Form, Input, Button, Image, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
//antd end

//firebase start
import fireStore from "../components/commons/Firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
//firebase end

const { Title } = Typography;

function Register() {
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
    //check account exist
    let result = accounts.filter(
      (account) => account.email === values["Email"]
    );
    if (result.length > 0) {
      alert("Email này đã được sử dụng");
    } else {
      alert("Đăng ký thành công");

      createAccount(values["Email"], values["Fullname"], values["Mật khẩu"]);
      history.push("/home");
      return;
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
                        Đăng Ký
                      </Title>
                    </Form.Item>

                    <Form.Item
                      name="Email"
                      rules={[
                        {
                          type: "email",
                          message: "Đây không phải email",
                        },
                        {
                          required: true,
                          message: "Hãy nhập email của bạn",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined style={{ marginRight: 10 }} />}
                        placeholder="Email"
                        style={{ height: 35 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Fullname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(
                            /^[A-Za-z\u00C0-\u024F\u1E00-\u1EFF ]+$/
                          ),
                          message: "Hãy nhập đúng tên của bạn",
                        },
                      ]}
                    >
                      <div className="register-input">
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="Họ và tên"
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="Mật khẩu"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(
                            // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\u00C0-\u024F\u1E00-\u1EFF ]{6,30}$/
                          ),
                          message:
                            "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt, 1 khoảng trắng",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        prefix={<LockOutlined style={{ marginRight: 10 }} />}
                        type="password"
                        placeholder="Mật khẩu"
                        style={{ height: 35 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Xác nhận mật khẩu"
                      rules={[]}
                      dependencies={["password"]}
                      hasFeedback
                    >
                      <div className="register-input">
                        <Input
                          prefix={<LockOutlined />}
                          type="password"
                          placeholder="Xác nhận mật khẩu"
                        />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: 15, width: "100%" }}
                      >
                        Đăng ký
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      Đã tài khoản?<a href="/login"> Đăng nhập ngay</a>
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

export default Register;
