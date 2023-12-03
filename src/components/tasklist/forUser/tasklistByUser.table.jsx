import { useEffect, useState } from "react";
import { Table, Button, notification, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllTaskListByUser, deleteTaskListByUser } from "../../../utils/api";
import { useSelector } from "react-redux";
import CreateTaskListByUserModal from "./createTasklistByUser.modal";
import UpdateTaskListByUserModal from "./updateTasklistByUser.modal";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const TaskListByUser = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tasklists, setTaskLists] = useState([]);
  const userId = useSelector((state) => state.auth.user._id);
  const [updateData, setUpdateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, [meta.current, meta.pageSize]);

  const getData = async () => {
    setLoading(true);

    const res = await getAllTaskListByUser(userId, meta.current, meta.pageSize);
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
      title: "Ghi chú",
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

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      <div
        style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
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
