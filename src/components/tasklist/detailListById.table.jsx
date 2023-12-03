import React from "react";
import { Button, Popconfirm, Table, notification } from "antd";
import { useState, useEffect } from "react";
import {
  deleteTaskListByAdmin,
  getAllTaskListWithUserID,
} from "../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useSelector } from "react-redux";
import UpdateTasklistByAdmin from "./forAdmin/updateTasklistByAdmin.modal";
dayjs.locale("vi");

const DetailListById = (props) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const { userid } = props;
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const role = useSelector((state) => state.auth.user.role);

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
    const current = meta.current;
    const pageSize = meta.pageSize;
    const resTasklist = await getAllTaskListWithUserID(
      userid,
      current,
      pageSize
    );
    if (resTasklist.data) {
      setTaskList(resTasklist.data.result);
      setMeta({
        current: resTasklist.data.meta.current,
        pageSize: resTasklist.data.meta.pageSize,
        pages: resTasklist.data.meta.pages,
        total: resTasklist.data.meta.total,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: resTasklist.message,
      });
    }

    setLoading(false);
  };

  const confirmDelete = async (id) => {
    const res = await deleteTaskListByAdmin(id);
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
                disabled={role === "ADMIN" ? false : true}
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
                <Button
                  type={"primary"}
                  danger
                  disabled={role === "ADMIN" ? false : true}
                >
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
    <>
      <Table
        size="small"
        dataSource={taskList}
        columns={tasklistColumns}
        rowKey={"_id"}
        loading={loading}
        bordered={false}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          onChange: (page, pageSize) => handleOnchangeTable(page, pageSize),
          showSizeChanger: false,
          defaultPageSize: meta.pageSize,
        }}
      />
      <UpdateTasklistByAdmin
        updateData={updateData}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        setUpdateData={setUpdateData}
      />
    </>
  );
};

export default DetailListById;
