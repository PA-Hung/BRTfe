import React from "react";
import { Layout, Button, Switch } from "antd";
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const HeaderAdmin = (props) => {
  const { toggleCollapsed, collapsed } = props;
  return (
    <>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          height: 50,
          backgroundColor: "white",
          paddingLeft: 5,
          paddingRight: 20,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ paddingTop: 2 }}>
          <Button
            onClick={toggleCollapsed}
            type="text"
            style={{ fontSize: 15 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div style={{ paddingBottom: 3 }}>
          <Switch
            checkedChildren="Tối"
            unCheckedChildren="Sáng"
            defaultChecked={false}
          />
        </div>
      </Header>
    </>
  );
};

export default HeaderAdmin;
