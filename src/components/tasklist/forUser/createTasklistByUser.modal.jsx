import { Modal, Input, notification, Form, Select, DatePicker } from "antd";
import { postCreateTaskListByUser } from "../../../utils/api";

const CreateTaskListByUserModal = (props) => {
  const { getData, isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const resetModal = () => {
    setIsCreateModalOpen(false);
    // form.resetFields()
  };

  const onFinish = async (values) => {
    // const { name, phone, password, role } = values
    // const data = { name, phone, password, role }
    //console.log(">>>>>>> check data", values);
    const data = values; // viết gọn của 2 dòng trên
    const res = await postCreateTaskListByUser(data);
    if (res.data) {
      await getData();
      notification.success({
        message: "Đăng ký danh sách thành công !",
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
        title="Thêm mới lịch làm việc"
        open={isCreateModalOpen}
        onOk={() => form.submit()}
        onCancel={resetModal}
        maskClosable={false}
        width={350}
      >
        <Form
          name="create-tasklist-byuser"
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item>
            <Form.Item
              name="date"
              label="Ngày làm việc"
              rules={[{ required: true, message: "Chọn ngày làm việc !" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="period"
              label="Thời gian"
              rules={[{ required: true, message: "Chọn thời gian làm việc !" }]}
            >
              <Select
                placeholder="Chọn buổi làm việc !"
                allowClear
                options={[
                  { value: "SÁNG", label: "SÁNG" },
                  { value: "CHIỀU", label: "CHIỀU" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Ghi chú"
              name="note"
              rules={[{ required: true, message: "Nhập ghi chú của bạn !" }]}
            >
              <TextArea
                showCount
                maxLength={100}
                placeholder="Nhập ghi chú của bạn ..."
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskListByUserModal;
