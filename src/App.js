import {
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input, Button } from "antd";
import React, { useState } from "react";
import "./App.css";
const { Header, Content, Sider } = Layout;

const defaultList = [
  {
    key: "1",
    children: [
      {
        key: "子菜单 1-1",
        label: "子菜单 1-1",
      },
      {
        key: "子菜单 1-2",
        label: "子菜单 1-2",
      },
    ],
    label: "菜单一",
  },
  {
    key: "2",
    children: [
      {
        key: "子菜单 2-1",
        label: "子菜单 2-1",
      },
      {
        key: "子菜单 2-2",
        label: "子菜单 2-2",
      },
    ],
    label: "菜单二",
  },
];
const App = () => {
  const [curItemName, setCurItemName] = useState("");
  const [menuList, setMenuList] = useState(defaultList);
  const [inputValue, setInputValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick = (e) => {
    console.log(e);
    setCurItemName(e.key);
    setInputValue(e.key);
  };

  // 重置菜单名字
  const resetMenuName = () => {
    const updateMenuList = (list) => {
      return list.map((item) => {
        if (item.children) {
          return {
            ...item,
            children: updateMenuList(item.children),
          };
        } else if (item.key === curItemName) {
          return { ...item, key: inputValue, label: inputValue };
        }
        return item;
      });
    };

    setMenuList(updateMenuList(menuList));
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="header-left">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="logo"
            className="react-icon"
          />
          <span className="icon-text">react</span>
        </div>
        <div
          className="header-right"
          style={{ display: "flex", width: "40px", flexWrap: "nowrap" }}
        >
          <QuestionCircleOutlined className="quora-icon" />
          <span style={{ color: "white" }}>admin</span>
        </div>
      </Header>
      <Layout>
        <Sider>
          <div className="sider">
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
                background: "#001529",
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="dark"
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={menuList}
              onClick={onClick}
              inlineCollapsed={collapsed}
            />
          </div>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ width: "200px", marginRight: "20px" }}
            />
            <Button
              onClick={resetMenuName}
              style={{ background: "#00FFFF", color: "white" }}
            >
              保存
            </Button>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
