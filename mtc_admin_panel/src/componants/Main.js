import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Route, Routes } from "react-router-dom";
import TextEditor from "./TextEditor";
import Content1 from "./Content";
const { Header, Sider, Content } = Layout;

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onSelectMenu = (item) => {
    navigate(item.key);
  };

  return (
    <Layout
      className="main"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "white",
        }}
      >
        <Menu
          style={{
            backgroundColor: "#2957a4",
            color: "white",
            height: "100%",
          }}
          defaultSelectedKeys={["1"]}
          onClick={onSelectMenu}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "/editor",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "/roi",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          backgroundColor: "white",
        }}
      >
        <Header
          style={{
            padding: "0",
            backgroundColor: "white",
            borderBottom: "1px solid #2957a4",
            padding: "0px 20px 0px 20px",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            backgroundColor: "white",
            borderRadius: "0 10px 10px 0",
            padding: "20px",
            height: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<Content1 />} />
            <Route path="/editor" element={<TextEditor />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
