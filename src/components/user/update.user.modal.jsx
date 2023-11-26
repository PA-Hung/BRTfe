import { useEffect } from "react";
import { Modal, Input, notification, Form, Select, InputNumber } from "antd";
import { updateUser } from "../../utils/api";

const UpdateUserModal = (props) => {
  const {
    access_token,
    updateData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    getData,
    setUpdateData,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (updateData) {
      form.setFieldsValue({
        name: updateData.name,
        phone: updateData.phone,
        role: updateData.role,
      });
    }
  }, [updateData]);

  const onFinish = async (values) => {
    const { name, phone, role } = values;
    const data = {
      _id: updateData?._id,
      name,
      phone,
      role,
    };

    const res = await updateUser(data);
    if (res.data) {
      await getData();
      notification.success({
        message: "Cập nhật dùng thành công !",
      });
      resetModal();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const resetModal = () => {
    setIsUpdateModalOpen(false);
    setUpdateData(null);
    //form.resetFields()
  };

  return (
    <>
      <Modal
        title="Cập nhật"
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={resetModal}
        maskClosable={false}
      >
        <Form
          name="create-new-user"
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 16px)",
                marginBottom: 0,
              }}
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50%)",
                marginLeft: 8,
                marginBottom: 0,
              }}
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 16px)",
                marginBottom: 0,
              }}
              label="Password"
              name="password"
              rules={[
                {
                  required: updateData ? false : true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password disabled={updateData ? true : false} />
            </Form.Item>

            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50%)",
                marginLeft: 8,
                marginBottom: 5,
              }}
              name="role"
              label="Role"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Chọn quyền !"
                allowClear
                options={[
                  { value: "ADMIN", label: "Admin" },
                  { value: "USER", label: "User" },
                ]}
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
