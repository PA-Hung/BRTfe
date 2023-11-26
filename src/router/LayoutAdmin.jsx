import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Button, Menu, notification } from "antd";
import {
  HomeOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Logo from "../components/admin/Logo.jsx";
import ToggleThemeButton from "../components/admin/ToggleTheme.jsx";
import { postLogOut } from "../utils/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutAction } from "../redux/slice/authSlice.js";

const { Header, Footer, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.user);
  //console.log(">>>>>>>isAuthenticated", isAuthenticated);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleMenu = (e) => {
    //console.log('e', e);
  };

  const handleLogout = async () => {
    const res = await postLogOut();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      notification.success({
        message: "Đăng xuất thành công !",
      });
      navigate("/");
    }
  };

  const items = [
    {
      label: <Link to={"/admin"}>Trang chủ</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/admin/users"}>Quản lý</Link>,
      key: "user",
      icon: <UserSwitchOutlined />,
    },
    {
      label: <Link to={"/admin/workdays"}>Bảng đăng ký</Link>,
      key: "activity",
      icon: <CalendarOutlined />,
    },
    {
      label: <Link onClick={() => handleLogout()}>Đăng xuất</Link>,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={darkTheme ? "dark" : "light"}
      >
        <Logo />
        <Menu
          onClick={handleMenu}
          style={{ height: "calc(100vh - 60px)" }}
          mode="inline"
          theme={darkTheme ? "dark" : "light"}
          items={items}
          defaultSelectedKeys={["home"]}
        />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            height: 50,
            backgroundColor: "white",
            paddingLeft: 10,
            justifyContent: "left",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Button
            onClick={toggleCollapsed}
            type="text"
            style={{ fontSize: 15 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Content>
          <div
            style={{ backgroundColor: "white", height: "calc(100vh - 60px)" }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ backgroundColor: 'white', height: '50px' }}>Footer</Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
