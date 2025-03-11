import { useState } from "react";
import {
  Card,
  Col,
  Row,
  Table,
  Typography,
  Pagination,
  Button,
  Modal,
  Form,
  Input,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setParams, search } from "../stores/features/user/slice";
import { createReviewer } from "../stores/features/user/slice"; // Action tạo reviewer
import { useEffect } from "react";

const roleColors = {
  1: { text: "Admin", color: "red" },
  2: { text: "User", color: "blue" },
  3: { text: "Reviewer", color: "green" },
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    render: (role) => {
      const roleInfo = roleColors[role] || { text: "Unknown", color: "gray" };
      return <Tag color={roleInfo.color}>{roleInfo.text}</Tag>;
    },
  },
];

function User() {
  const dispatch = useDispatch();
  const { data, params, status, totalElements } = useSelector(
    (state) => state.user
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(search());
  }, [params, dispatch]);

  const handleChangePagination = (page, pageSize) => {
    dispatch(setParams({ page: page - 1, size: pageSize }));
  };

  const handleCreateReviewer = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      dispatch(createReviewer(values));
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <>
      <div className="tabled ">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace p-15"
              title="User List"
            >
              <Row justify="end">
                <Col>
                  <Button type="primary" onClick={handleCreateReviewer}>
                    Create new reviewer
                  </Button>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  loading={status === "loading"}
                  className="ant-border-space"
                  rowKey="id"
                />
              </div>
              <Pagination
                className="mt-2"
                current={params.page + 1}
                pageSize={params.size}
                total={totalElements}
                onChange={handleChangePagination}
                showSizeChanger
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Create New Reviewer"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default User;
