import { Modal, Input, notification, Form, Select, DatePicker } from "antd";
import { updateTaskListByUser } from "../../utils/api";
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const UpdateTaskListByUserModal = (props) => {
  const {
    updateData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    getData,
    setUpdateData,
  } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const resetModal = () => {
    setIsUpdateModalOpen(false);
    setUpdateData(null);
    // form.resetFields()
  };

  useEffect(() => {
    if (updateData) {
      const momentDate = dayjs(updateData.date).isValid()
        ? dayjs(updateData.date)
        : null;
      form.setFieldsValue({
        date: momentDate,
        period: updateData.period,
        note: updateData.note,
      });
    }
  }, [updateData]);

  const onFinish = async (values) => {
    const { date, period, note } = values;
    const data = { _id: updateData._id, date, period, note };
    console.log(">>>>>>> check data", data.date);
    const res = await updateTaskListByUser(data);
    if (res.data) {
      await getData();
      notification.success({
        message: "Cập nhật danh sách thành công !",
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
        title="Cập nhật lịch làm việc"
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={resetModal}
        maskClosable={false}
        width={350}
      >
        <Form
          name="update-tasklist-byuser"
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
              <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
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

export default UpdateTaskListByUserModal;
