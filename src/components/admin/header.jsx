import React from "react";
import { Layout, Button, Dropdown, Space, notification } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { postLogOut } from "../../utils/api";
import { setLogoutAction } from "../../redux/slice/authSlice";
import { setHomeKey } from "../../redux/slice/menuSilce";
const { Header } = Layout;

const HeaderAdmin = (props) => {
  const { toggleCollapsed, collapsed, darkMode } = props;
  const activeTitle = useSelector((state) => state.menu.title);
  const loginName = useSelector((state) => state.auth.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      key: "1",
      label: (
        <Link>
          <SettingOutlined /> Tài khoản của tôi
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link onClick={() => handleLogout()}>
          <LogoutOutlined /> Đăng xuất
        </Link>
      ),
    },
  ];

  return (
    <>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          height: 50,
          paddingLeft: 5,
          paddingRight: 20,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: darkMode ? "" : "white",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <div style={{ paddingTop: 2 }}>
          <Button
            onClick={toggleCollapsed}
            type="text"
            style={{ fontSize: 15, color: darkMode ? "white" : "" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div
          style={{
            color: darkMode ? "white" : "",
          }}
        >
          <h2>{activeTitle}</h2>
        </div>
        <div style={{ paddingBottom: 3 }}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {loginName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default HeaderAdmin;
