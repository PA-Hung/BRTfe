import React from "react";
import { Table, notification } from "antd";
import { useState, useEffect } from "react";
import { getTasklistbyUserId } from "../../utils/api";

const DetailListById = (props) => {
  const { userid } = props;
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 14,
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
    const resTasklist = await getTasklistbyUserId(userid, current, pageSize);
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
        return <div>{record.date}</div>;
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
