import { useEffect, useState } from "react";
import {
  Table,
  Button,
  notification,
  Popconfirm,
  message,
  Form,
  Input,
} from "antd";
import queryString from "query-string";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { deleteCameraMan, getCameraMan } from "../../utils/api";
import CreateCameraModal from "./create.camera.modal";
import UpdateCameraModal from "./update.camera.modal";

const CameraTable = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [listCameraMan, setListCameraMan] = useState([]);
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
    const query = buildQuery();
    setLoading(true);
    const res = await getCameraMan(query);
    if (res.data) {
      setListCameraMan(res.data.result);
      setMeta({
        current: res?.data?.meta?.current,
        pageSize: res?.data?.meta?.pageSize,
        pages: res.data.meta.pages,
        total: res.data.meta.total,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        placement: "top",
        description: res.message,
      });
    }
    setLoading(false);
  };

  const confirmDelete = async (user) => {
    const res = await deleteCameraMan(user._id);
    if (res.data) {
      await getData();
      message.success("Xoá quay phim thành công !");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        placement: "top",
        description: res.message,
      });
    }
  };

  const columns = [
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
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

  const [form] = Form.useForm();

  const buildQuery = (
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
    const query = buildQuery(value);
    setLoading(true);
    const res = await getCameraMan(query);
    if (res.data) {
      setListCameraMan(res.data.result);
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
            <Form.Item label="Tên" name="name">
              <Input placeholder="Nhập tên quay phim" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input placeholder="Nhập số điện thoại" />
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
        columns={columns}
        dataSource={listCameraMan}
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
      <CreateCameraModal
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateCameraModal
        updateData={updateData}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default CameraTable;
