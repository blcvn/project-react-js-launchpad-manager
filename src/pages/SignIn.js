import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Switch,
  Typography,
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import signinbg from "../assets/images/img-signin.jpg";
import { login } from "../stores/features/auth/slice";

const { Title } = Typography;
const { Content } = Layout;

class SignIn extends Component {
  onFinish = (values) => {
    this.props.login(values).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    return (
      <>
        <Layout className="layout-default layout-signin">
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form
                  onFinish={this.onFinish}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    className="align-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>

                  <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(SignIn);
