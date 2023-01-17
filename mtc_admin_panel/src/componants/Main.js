import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Route, Routes } from "react-router-dom";
import EditorProduct from "./Product_editor/Product_editor";
import EditorUser from "./User_editor/User_editor";
import EditorCreate from "./Editor/EditorCreate";
import Shareholders from "./Shareholders";
import Account from "./Account";
import Product from "./Product";
import News from "./News";
import User from "./User";
import ResnumFilter from "./ResnumFilter";
import Order from "./Order";
import Chatbot from "./Chatbot/Chat";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  StockOutlined,
  UserAddOutlined,
  FileAddOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
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
          defaultSelectedKeys={"/"}
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
              key: "/product",
              icon: <BoxPlotOutlined />,
              label: "Бүтээгдэхүүн",
            },
            {
              key: "/resnum",
              icon: <FileAddOutlined />,
              label: "Ажлын зар",
            },
            {
              key: "/order",
              icon: <FileAddOutlined />,
              label: "order",
            },
            {
              key: "/user",
              icon: <UserAddOutlined />,
              label: "Админ нэмэх",
            },
            {
              key: "/chatbot",
              icon: <UserAddOutlined />,
              label: "chatbot",
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
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/account" element={<Account />} />
            <Route path="/shareholders" element={<Shareholders />} />
            <Route path="/product" element={<Product />}></Route>
            <Route path="/editor" element={<EditorCreate />} />
            <Route path="/product/create" element={<EditorProduct />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/create" element={<EditorUser />} />
            <Route path="/order" element={<Order />} />
            <Route path="/resnum" element={<ResnumFilter />} />
            <Route path="/chatbot" element={<Chatbot />} />
            {/* <Route path="/msg" element={<Msg />} /> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
