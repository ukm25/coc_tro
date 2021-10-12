import "./Register.css";
import { createAccount } from "../commons/Utils";

// react start
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//react end

//antd start
import { Form, Input, Button, Image } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
//antd end

//firebase start
import fireStore from "../../firebase/Firebase";
import { onSnapshot, collection } from "firebase/firestore";
//firebase end

function Register() {
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
    //check account exist
    let result = accounts.filter((account) => account.email === values["Email"]);
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
    <div className="register-container">
      <Image
        className="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <div className="container-form-register">
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item>
            <div className="register-label">
              <span>Đăng Ký</span>
            </div>
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
            <div className="register-input">
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </div>
          </Form.Item>

          <Form.Item
            name="Fullname"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[A-Za-z\u00C0-\u024F\u1E00-\u1EFF ]+$/),
                message: "Hãy nhập đúng tên của bạn",
              },
            ]}
          >
            <div className="register-input">
              <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
            </div>
          </Form.Item>

          <Form.Item
            name="Mật khẩu"
            rules={
              [
                {
                  required: true,
                  // min: 6,
                  // max: 30,
                  pattern: new RegExp(
                    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\u00C0-\u024F\u1E00-\u1EFF ]{6,30}$/
                  ),
                  message: "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt, 1 khoảng trắng",
                },
              ]
            }
            hasFeedback
          >
            <div className="register-input">
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
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
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>

          <Form.Item>
            <p>
              Đã tài khoản?<a href="/login"> Đăng nhập ngay</a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
