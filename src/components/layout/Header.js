import { useEffect, useState } from "react";

import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Dropdown,
  Row,
  Switch,
  Typography,
} from "antd";

import {
  FacebookFilled,
  StarOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../stores/features/auth/slice";

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const dispatch = useDispatch();
  const { Title, Text } = Typography;

  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");

  useEffect(() => window.scrollTo(0, 0));

  const hideDrawer = () => setVisible(false);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Badge size="small">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: <label onClick={handleLogout}>Disconnect</label>,
                    extra: "⌘P",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <div>
                <img
                  alt=""
                  src="https://avatar.iran.liara.run/public"
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </div>
            </Dropdown>
          </Badge>
          {/* <Button type="link" onClick={showDrawer}>
            {logsetting}
          </Button>
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button> */}
          <Drawer
            className="settings-drawer"
            mask={true}
            width={360}
            onClose={hideDrawer}
            placement={placement}
            visible={visible}
          >
            <div layout="vertical">
              <div className="header-top">
                <Title level={4}>
                  Configurator
                  <Text className="subtitle">See our dashboard options.</Text>
                </Title>
              </div>

              <div className="sidebar-color">
                <Title level={5}>Sidebar Color</Title>
                <div className="theme-color mb-2">
                  <ButtonContainer>
                    <Button
                      type="primary"
                      onClick={() => handleSidenavColor("#1890ff")}
                    >
                      1
                    </Button>
                    <Button
                      type="success"
                      onClick={() => handleSidenavColor("#52c41a")}
                    >
                      1
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleSidenavColor("#d9363e")}
                    >
                      1
                    </Button>
                    <Button
                      type="yellow"
                      onClick={() => handleSidenavColor("#fadb14")}
                    >
                      1
                    </Button>

                    <Button
                      type="black"
                      onClick={() => handleSidenavColor("#111")}
                    >
                      1
                    </Button>
                  </ButtonContainer>
                </div>

                <div className="sidebarnav-color mb-2">
                  <Title level={5}>Sidenav Type</Title>
                  <Text>Choose between 2 different sidenav types.</Text>
                  <ButtonContainer className="trans">
                    <Button
                      type={sidenavType === "transparent" ? "primary" : "white"}
                      onClick={() => {
                        handleSidenavType("transparent");
                        setSidenavType("transparent");
                      }}
                    >
                      TRANSPARENT
                    </Button>
                    <Button
                      type={sidenavType === "white" ? "primary" : "white"}
                      onClick={() => {
                        handleSidenavType("#fff");
                        setSidenavType("white");
                      }}
                    >
                      WHITE
                    </Button>
                  </ButtonContainer>
                </div>
                <div className="fixed-nav mb-2">
                  <Title level={5}>Navbar Fixed </Title>
                  <Switch onChange={(e) => handleFixedNavbar(e)} />
                </div>
                <div className="ant-docment">
                  <ButtonContainer>
                    <Button type="black" size="large">
                      FREE DOWNLOAD
                    </Button>
                    <Button size="large">VIEW DOCUMENTATION</Button>
                  </ButtonContainer>
                </div>
                <div className="viewstar">
                  <a href="#pablo">{<StarOutlined />} Star</a>
                  <a href="#pablo"> 190</a>
                </div>

                <div className="ant-thank">
                  <Title level={5} className="mb-2">
                    Thank you for sharing!
                  </Title>
                  <ButtonContainer className="social">
                    <Button type="black">{<TwitterOutlined />}TWEET</Button>
                    <Button type="black">{<FacebookFilled />}SHARE</Button>
                  </ButtonContainer>
                </div>
              </div>
            </div>
          </Drawer>
          {/* <Link to="/sign-in" className="btn-sign-in">
            {profile}
            <span>Sign in</span>
          </Link> */}
          {/* <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          /> */}
        </Col>
      </Row>
    </>
  );
}

export default Header;
