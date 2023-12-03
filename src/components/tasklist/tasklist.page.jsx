import { useEffect, useState } from "react";
import { Table, notification } from "antd";
import { getAllUsersWithTask } from "../../utils/api";
import DetailListById from "./detailListById.table";

const Tasklist = () => {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 14,
    pages: 0,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, [meta.current, meta.pageSize]);

  const userColumns = [
    Table.EXPAND_COLUMN,
    {
      title: "Phóng viên",
      dataIndex: "name",
      key: "name",
      render: (_value, record) => {
        return <div>{record?.name}</div>;
      },
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 170,
      key: "phone",
      render: (_value, record) => {
        return <div>{record?.phone}</div>;
      },
    },
  ];

  const getData = async () => {
    setLoading(true);

    const res = await getAllUsersWithTask(meta.current, meta.pageSize);
    if (res.data) {
      setListUsers(res.data.result);
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

  const handleOnchangeTable = (page, pageSize) => {
    setMeta({
      current: page,
      pageSize: pageSize,
      pages: meta.pages,
      total: meta.total,
    });
  };

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
      <Table
        size="small"
        columns={userColumns}
        dataSource={listUsers}
        rowKey={"_id"}
        loading={loading}
        bordered={true}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <div>
                <DetailListById userid={record._id} />
              </div>
            );
          },
          //columnTitle: 'Mở rộng',
        }}
        scroll={{ x: true, y: 450, scrollToFirstRowOnChange: true }}
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
    </div>
  );
};

export default Tasklist;
