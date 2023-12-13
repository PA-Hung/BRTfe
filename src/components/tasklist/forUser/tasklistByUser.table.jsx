import { useEffect, useState } from "react";
import {
  Table,
  Button,
  notification,
  Popconfirm,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllTaskListByUser, deleteTaskListByUser } from "../../../utils/api";
import { useSelector } from "react-redux";
import CreateTaskListByUserModal from "./createTasklistByUser.modal";
import UpdateTaskListByUserModal from "./updateTasklistByUser.modal";
import queryString from "query-string";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const TaskListByUser = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tasklists, setTaskLists] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [updateData, setUpdateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, [meta.current, meta.pageSize]);

  const getData = async () => {
    setLoading(true);
    const query = buildQuery();
    const res = await getAllTaskListByUser(query);
    if (res.data) {
      setTaskLists(res.data.result);
      setMeta({
        current: res.data.meta.current,
        pageSize: res.data.meta.pageSize,
        pages: res.data.meta.pages,
        total: res.data.meta.total,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }

    setLoading(false);
  };

  const confirmDelete = async (id) => {
    const res = await deleteTaskListByUser(id);
    if (res.data) {
      await getData();
      notification.success({
        message: "Xoá dữ liệu thành công !",
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const tasklistColumns = [
    {
      title: "Ngày làm việc",
      width: "250px",
      dataIndex: "date",
      key: "date",
      render: (_value, record) => {
        const rawDate = dayjs(record.date).format("dddd");
        const date = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            <div>{date}</div>
            <div>{dayjs(record.date).format(", [ngày] DD/MM/YYYY")}</div>
          </div>
        );
      },
    },
    {
      title: "Thời gian làm việc",
      width: "200px",
      dataIndex: "period",
      key: "period",
      render: (_value, record) => {
        return <div>{record.period}</div>;
      },
    },
    {
      title: "Quay phim",
      dataIndex: "camera",
      key: "camera",
      render: (_value, record) => {
        return <div>{record.note}</div>;
      },
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      render: (_value, record) => {
        return <div>{record.location}</div>;
      },
    },
    {
      title: "Nội dung công việc",
      dataIndex: "note",
      key: "note",
      render: (_value, record) => {
        return <div>{record.note}</div>;
      },
    },
    {
      title: "Actions",
      width: "250px",
      render: (record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <div>
              <Button
                danger
                onClick={() => {
                  setIsUpdateModalOpen(true);
                  setUpdateData(record);
                }}
              >
                Cập nhật
              </Button>
            </div>
            <div>
              <Popconfirm
                title={`Bạn muốn xoá dữ liệu này ?`}
                onConfirm={() => confirmDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type={"primary"} danger>
                  Xoá
                </Button>
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];

  const handleOnchangeTable = (page, pageSize) => {
    setMeta({
      current: page,
      pageSize: pageSize,
      pages: meta.pages,
      total: meta.total,
    });
  };

  const buildQuery = (
    params,
    sort,
    filter,
    userId = user._id,
    page = meta.current,
    pageSize = meta.pageSize
  ) => {
    const clone = { ...params };

    if (clone.date) clone.date = dayjs(clone.date).format();
    if (clone.period) clone.period = `/${clone.period}/i`;
    if (clone.note) clone.note = `/${clone.note}/i`;

    let temp = queryString.stringify(clone);

    let sortBy = "";
    if (sort && sort.date) {
      sortBy = sort.date === "ascend" ? "sort=date" : "sort=-date";
    }
    if (sort && sort.period) {
      sortBy = sort.period === "ascend" ? "sort=period" : "sort=-period";
    }
    if (sort && sort.note) {
      sortBy = sort.note === "ascend" ? "sort=note" : "sort=-note";
    }
    if (sort && sort.createdAt) {
      sortBy =
        sort.createdAt === "ascend" ? "sort=createdAt" : "sort=-createdAt";
    }
    if (sort && sort.updatedAt) {
      sortBy =
        sort.updatedAt === "ascend" ? "sort=updatedAt" : "sort=-updatedAt";
    }

    //mặc định sort theo updatedAt
    if (Object.keys(sortBy).length === 0) {
      temp = `${userId}?current=${page}&pageSize=${pageSize}&${temp}&sort=-date`;
    } else {
      temp = `${userId}?current=${page}&pageSize=${pageSize}&${temp}&${sortBy}`;
    }
    return temp;
  };

  const onSearch = async (values) => {
    const query = buildQuery(values);
    setLoading(true);
    const res = await getAllTaskListByUser(query);
    if (res.data) {
      setTaskLists(res.data.result);
      setMeta({
        current: res.data.meta.current,
        pageSize: res.data.meta.pageSize,
        pages: res.data.meta.pages,
        total: res.data.meta.total,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <div>
          <Form
            name="search-form"
            onFinish={onSearch}
            layout="inline"
            form={form}
          >
            <Form.Item name="date" label="Ngày làm việc">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item name="period" label="Thời gian">
              <Select
                placeholder="Chọn buổi làm việc"
                allowClear
                options={[
                  { value: "SÁNG", label: "SÁNG" },
                  { value: "CHIỀU", label: "CHIỀU" },
                ]}
              />
            </Form.Item>
            {/* <Form.Item label="Địa điểm" name="location">
              <Input placeholder="Nhập địa điểm ..." />
            </Form.Item> */}
            <Form.Item label="Nội dung công việc" name="note">
              <Input placeholder="Nhập ghi chú của bạn ..." />
            </Form.Item>
            <Button
              icon={<SearchOutlined />}
              type={"primary"}
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Form>
        </div>
        <div>
          <Button
            icon={<PlusOutlined />}
            type={"primary"}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <Table
        size="small"
        columns={tasklistColumns}
        dataSource={tasklists}
        rowKey={"_id"}
        loading={loading}
        bordered={true}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]} - ${range[1]} of ${total} items`,
          onChange: (page, pageSize) => handleOnchangeTable(page, pageSize),
          showSizeChanger: true,
          defaultPageSize: meta.pageSize,
        }}
      />{" "}
      {/*  // dataSource phải là mảng Array [] */}
      <CreateTaskListByUserModal
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateTaskListByUserModal
        updateData={updateData}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default TaskListByUser;
