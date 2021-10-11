import React, { useState } from "react";
import "./Register.css";
import { Form, Input, Button, Image } from "antd";

import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

function Register(props) {
  const [message, setMessage] = useState("Hãy nhập mật khẩu!");
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(localStorage);
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
          <Form.Item name="Fullname" rules={[
            {
              required: true,
              pattern: new RegExp(/^[A-Za-z\u00C0-\u024F\u1E00-\u1EFF ]+$/),
              message: "Hãy nhập đúng tên của bạn",
            }
          ]}>
            <div className="register-input">
              <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
            </div>
          </Form.Item>
          <Form.Item name="Mật khẩu" rules={[
            {
              required: true,
              // min: 6,
              // max: 30,
              pattern: new RegExp(
                // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\u00C0-\u024F\u1E00-\u1EFF ]{6,30}$/
              ),
              message: { message },
            },
          ]} hasFeedback>
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
