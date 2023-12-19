import { Modal, Input, notification, Form, Select } from "antd";
import { postCreateCameraMan } from "../../utils/api";

const CreateCameraModal = (props) => {
  const { getData, isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm();

  const resetModal = () => {
    setIsCreateModalOpen(false);
    // form.resetFields()
  };

  const onFinish = async (values) => {
    // const { name, phone } = values
    // const data = { name, phone }
    const data = values; // viết gọn của 2 dòng trên
    const res = await postCreateCameraMan(data);
    if (res.data) {
      await getData();
      notification.success({
        message: "Tạo mới quay phim thành công !",
      });
      resetModal();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới quay phim"
        open={isCreateModalOpen}
        onOk={() => form.submit()}
        onCancel={resetModal}
        maskClosable={false}
        width={350}
      >
        <Form
          name="create-new-cameraman"
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item>
            <Form.Item
              label="Tên quay phim"
              name="name"
              rules={[{ required: true, message: "Nhập tên quay phim !" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Nhập số điện thoại !" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCameraModal;
