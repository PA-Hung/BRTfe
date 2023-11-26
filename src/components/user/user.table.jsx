import { useEffect, useState } from "react";
import { Table, Button, notification, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";
import { deleteUser, getUsers } from "../../utils/api";

const UserTable = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU1YjYxZTRhYjhhMjBkNGUxZjc0NGQxIiwibmFtZSI6IkknbSBhZG1pbiIsInBob25lIjoiMDkzMzYzNDkzMyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMDcxNjY5OCwiZXhwIjoxNzAwODAzMDk4fQ.MtKjSgTxxfOnNLJG2DxIkXleq1Vch0nHpzGVXKX6B2c";
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 6,
    pages: 0,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, [meta.current, meta.pageSize]);

  const getData = async () => {
    setLoading(true);

    const res = await getUsers(meta.current, meta.pageSize);
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

  const confirmDelete = async (user) => {
    const res = await deleteUser(user._id);
    if (res.data) {
      await getData();
      message.success("Xoá người dùng thành công !");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const columns = [
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (_value, record) => {
        return <div>{record.phone}</div>;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quyền hạn",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
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
                title={`Bạn muốn xoá ${record.name} không ?`}
                onConfirm={() => confirmDelete(record)}
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
    <div style={{ padding: 30 }}>
      <div
        style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Quản lý phóng viên</h2>
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
        columns={columns}
        dataSource={listUsers}
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
      <CreateUserModal
        access_token={access_token}
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateUserModal
        access_token={access_token}
        updateData={updateData}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default UserTable;
