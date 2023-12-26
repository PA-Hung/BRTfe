import {
  Modal,
  Input,
  notification,
  Form,
  Select,
  DatePicker,
  message,
} from "antd";
import { getCameraMan, postCreateTaskListByUser } from "../../../utils/api";
import { useEffect, useState } from "react";
import _ from "lodash";

const CreateTaskListByUserModal = (props) => {
  const { getData, isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [listCamera, setListCamera] = useState([]);

  const resetModal = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  const convertDataSelect = (data) => {
    return _(data)
      .groupBy((x) => x.name)
      .map((value, key) => {
        // Assuming 'name' is the property you want to use
        const name = key; // 'key' now represents the 'name' from the grouped data
        //const _id = value[0]._id;
        return {
          //_id: _id,
          value: name,
          label: name,
        };
      })
      .value();
  };

  useEffect(() => {
    const init = async () => {
      const res = await getCameraMan(`current=1&pageSize=100`);
      if (res.data?.result) {
        setListCamera(convertDataSelect(res.data?.result));
      }
    };
    init();
  }, []);

  const onFinish = async (values) => {
    const data = values;
    const res = await postCreateTaskListByUser(data);
    if (res.data) {
      await getData();
      message.success("Đăng ký danh sách thành công !");
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
              name="cameraman"
              label="Quay phim"
              rules={[{ required: true, message: "Chọn quay phim !" }]}
            >
              <Select
                placeholder="Chọn quay phim !"
                allowClear
                mode="multiple"
                options={listCamera}
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
