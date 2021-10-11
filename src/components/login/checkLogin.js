

import React from "react";
import { Form, Input, Button, Col, Row, Image, Typography } from "antd";
import background from "../../images/background.jpg";
import { MailOutlined } from "@ant-design/icons";

const Title = Typography;
function Login(props) {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ height:500, background:'#fe762c' }}>
      <Row justify="center" style={{ paddingTop:120, height: 500}}>
        <Col justify="center" textAlign="center" span={8} >
          <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{ width:300 }} />
        </Col>
        <Col span={8} justify="center" style={{ maxHeight:400, borderRadius:'15' }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ background:'#fff' }}
            textAlign='center'
            style={{ textAlign:'center', background:'#fff',  }}
          >
            <Form.Item>
              <Title level={2}>Đăng nhập</Title>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
