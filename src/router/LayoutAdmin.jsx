import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Button, Menu, notification } from "antd";
import {
  HomeOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Logo from "@/components/admin/logo.jsx";
import ToggleThemeButton from "@/components/admin/toggleTheme.jsx";
import { postLogOut } from "@/utils/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutAction } from "@/redux/slice/authSlice.js";
import HeaderAdmin from "@/components/admin/header.jsx";
import { setActiveKey, setHomeKey } from "@/redux/slice/menuSilce.js";

const { Footer, Sider, Content } = Layout;

const LayoutAdmin = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.user.role);
  const activeMenu = useSelector((state) => state.menu.activeKey);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleMenu = (e) => {
    if (e.key === "home") {
      dispatch(
        setActiveKey({
          activeKey: e.key,
          title: "Bảng đăng ký sản xuất tiền kỳ chuyên mục tuần",
        })
      );
    }
    if (e.key === "user") {
      dispatch(
        setActiveKey({
          activeKey: e.key,
          title: "Quản lý phóng viên",
        })
      );
    }
    if (e.key === "usertasklist") {
      dispatch(
        setActiveKey({
          activeKey: e.key,
          title: "Danh sách đăng ký",
        })
      );
    }
  };

  const handleLogout = async () => {
    const res = await postLogOut();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      dispatch(setHomeKey());
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
      visible: "true",
    },
    {
      label: <Link to={"/admin/user"}>Quản lý</Link>,
      key: "user",
      icon: <UserSwitchOutlined />,
      visible: isAdmin === "ADMIN" ? "true" : "false",
    },
    // {
    //   label: <Link to={"/admin/tasklist"}>Bảng đăng ký</Link>,
    //   key: "tasklist",
    //   icon: <CalendarOutlined />,
    // },
    {
      label: <Link to={"/admin/usertasklist"}>Bảng đăng ký</Link>,
      key: "usertasklist",
      icon: <CalendarOutlined />,
      visible: isAdmin === "ADMIN" ? "false" : "true",
    },
    {
      label: <Link onClick={() => handleLogout()}>Đăng xuất</Link>,
      key: "logout",
      icon: <LogoutOutlined />,
      visible: "true",
    },
  ];

  const filteredItems = items.filter((item) => item.visible === "true");

  return (
    <Layout theme={darkMode ? "dark" : "light"} hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={darkMode ? "dark" : "light"}
        mode="inline"
      >
        <Logo />
        <Menu
          onClick={handleMenu}
          style={{ height: "calc(100vh - 60px)" }}
          mode="vertical"
          theme={darkMode ? "dark" : "light"}
          items={filteredItems}
          defaultSelectedKeys={["home"]}
          selectedKeys={activeMenu}
        />
        <ToggleThemeButton darkTheme={darkMode} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <HeaderAdmin toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
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
