import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Route, Routes } from "react-router-dom";
import TextEditor from "./TextEditor";
import News from "./News";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  StockOutlined,
  UserAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

function Main() {
  console.log(process.env.PORT);
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
          backgroundColor: "#2957a4",
          color: "white",
          height: "100%",
        }}
      >
        <div
          style={{
            padding: "22px",
            backgroundColor: "gray",
          }}
        >
          logo
        </div>
        <Menu
          style={{
            marginTop: "10px",
            backgroundColor: "#2957a4",
            color: "white",
          }}
          defaultSelectedKeys={["1"]}
          onClick={onSelectMenu}
          items={[
            {
              key: "/",
              icon: <FileTextOutlined />,
              label: "Мэдээ / Урамшуулал",
            },
            {
              key: "/account",
              icon: <DollarCircleOutlined />,
              label: "Шилэн данс",
            },
            {
              key: "/shareholders",
              icon: <StockOutlined />,
              label: "Хувьцаа эзэмшигч",
            },
            {
              key: "/job",
              icon: <FileAddOutlined />,
              label: "Ажлын зар",
            },
            {
              key: "/user",
              icon: <UserAddOutlined />,
              label: "Админ нэмэх",
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
            <Route path="/" element={<News />} />
            <Route path="/editor" element={<TextEditor />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
