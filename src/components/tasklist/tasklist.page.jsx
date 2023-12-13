import { useEffect } from "react";
import { Button, DatePicker, Form, Input, Select, Table } from "antd";
import DetailListById from "./detailListById.table";
import { SearchOutlined } from "@ant-design/icons";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPublic } from "../../redux/slice/searchUserSilce";
import AdminPage from "../admin/admin.page";

const Tasklist = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.searchUser.result);
  const meta = useSelector((state) => state.searchUser.meta);
  const isFetching = useSelector((state) => state.searchUser.isFetching);
  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, [meta.current, meta.pageSize]);

  const userColumns = [
    Table.EXPAND_COLUMN,
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (text, record, index) => {
        return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>;
      },
      hideInSearch: true,
    },
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
    const query = userQuery();
    dispatch(fetchUserPublic({ query }));
  };

  const handleOnchangeTable = (page, pageSize) => {
    setMeta({
      current: page,
      pageSize: pageSize,
      pages: meta.pages,
      total: meta.total,
    });
  };

  const userQuery = (
    params,
    sort,
    filter,
    page = meta.current,
    pageSize = meta.pageSize
  ) => {
    const clone = { ...params };
    if (clone.phone) clone.phone = `/${clone.phone}/i`;
    if (clone.name) clone.name = `/${clone.name}/i`;

    let temp = queryString.stringify(clone);

    let sortBy = "";
    if (sort && sort.phone) {
      sortBy = sort.phone === "ascend" ? "sort=phone" : "sort=-phone";
    }
    if (sort && sort.name) {
      sortBy = sort.name === "ascend" ? "sort=name" : "sort=-name";
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
      temp = `current=${page}&pageSize=${pageSize}&${temp}&sort=-updatedAt`;
    } else {
      temp = `current=${page}&pageSize=${pageSize}&${temp}&${sortBy}`;
    }
    return temp;
  };

  const onSearch = async (value) => {
    const query = userQuery(value);
    dispatch(fetchUserPublic({ query }));
  };

  return (
    <div>
      <AdminPage />
      <div
        style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Form
          name="search-form"
          onFinish={onSearch}
          layout="inline"
          form={form}
        >
          <Form.Item label="Tên" name="name">
            <Input placeholder="Nhập tên phóng viên" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Button icon={<SearchOutlined />} type={"primary"} htmlType="submit">
            Tìm kiếm
          </Button>
        </Form>
      </div>
      <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
        <Table
          size="small"
          columns={userColumns}
          dataSource={listUsers}
          rowKey={"_id"}
          loading={isFetching}
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
    </div>
  );
};

export default Tasklist;
