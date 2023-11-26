import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, notification } from "antd";
import "../../styles/login.css";
import { postLogin } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginInfo } from "../../redux/slice/authSlice";
import { useLocation } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const account = useSelector((state) => state.auth.user);
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    //đã login => redirect to '/'
    if (isAuthenticated === true) {
      window.location.href = "/admin";
    }
  }, []);

  const onFinish = async (values) => {
    const res = await postLogin(values.username, values.password);
    if (res?.data) {
      dispatch(setUserLoginInfo(res.data.user));
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập tài khoản thành công!");
      window.location.href = callback ? callback : "/admin";
    } else {
      notification.error({
        message: "Đăng nhập thất bại !",
        description: res.message,
      });
    }
  };

  return (
    <div className="login">
      <div>
        <label className="login-title">Đăng nhập</label>
      </div>
      <div className="border-form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Nhập tên đăng nhập!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu !",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
