import React from "react";
import { Table, notification } from "antd";
import { useState, useEffect } from "react";
import { getAllTaskListByAdmin } from "../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const DetailListById = (props) => {
  const { userid } = props;
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);

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
    const resTasklist = await getAllTaskListByAdmin(userid, current, pageSize);
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

  const tasklistColumns = [
    {
      title: "Ngày làm việc",
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
  );
};

export default DetailListById;
