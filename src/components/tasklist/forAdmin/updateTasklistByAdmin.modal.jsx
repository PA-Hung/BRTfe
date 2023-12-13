import { Modal, Input, notification, Form, Select, DatePicker } from "antd";
import { updateTaskListByAdmin } from "../../../utils/api";
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const UpdateTasklistByAdmin = (props) => {
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
    form.resetFields();
  };

  useEffect(() => {
    if (updateData) {
      const momentDate = dayjs(updateData.date).isValid()
        ? dayjs(updateData.date)
        : null;
      form.setFieldsValue({
        date: momentDate,
        period: updateData.period,
        location: updateData.location,
        note: updateData.note,
      });
    }
  }, [updateData]);

  const onFinish = async (values) => {
    const { date, period, location, note } = values;
    const data = { _id: updateData._id, date, period, location, note };
    const res = await updateTaskListByAdmin(data);
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
              <DatePicker
                disabled
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>

            <Form.Item
              name="period"
              label="Thời gian"
              rules={[{ required: true, message: "Chọn thời gian làm việc !" }]}
            >
              <Select
                disabled
                placeholder="Chọn buổi làm việc !"
                allowClear
                options={[
                  { value: "SÁNG", label: "SÁNG" },
                  { value: "CHIỀU", label: "CHIỀU" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="location"
              label="Địa điểm"
              rules={[{ required: false, message: "Nhập địa điểm tác nghiệp" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nội dung công việc"
              name="note"
              rules={[{ required: true, message: "Nhập nội dung công việc !" }]}
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

export default UpdateTasklistByAdmin;
