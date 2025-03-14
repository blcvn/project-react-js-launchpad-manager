import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  message,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import contributorAPI from "../api/contributor";
import projectAPI from "../api/project";
import { BackwardOutlined } from "@ant-design/icons";
import { PROJECT_STATUS_MAPPING } from "../utils/mapping";

const ProjectDetail = () => {
  const { projectId } = useParams(); // Lấy projectId từ URL

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [contributors, setContributors] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    projectAPI
      .getProjectDetail(projectId)
      .then((res) => {
        setProject(res);
        setContributors(res.contributors || []);
      })
      .catch((err) => console.error("Error fetching project:", err))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <Spin size="large" />;
  if (!project) return <p>Project not found</p>;

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "On-chain Amount",
      dataIndex: "onchainAmount",
      key: "onchainAmount",
    },
    {
      title: "Off-chain Amount",
      dataIndex: "offchainAmount",
      key: "offchainAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];
  const handleBack = () => {
    history.push("/project");
  };

  const addNewContributor = (values) => {
    const newContributor = { ...values };

    contributorAPI
      .createBatch({ projectId, contributors: [values] })
      .then(() => {
        setContributors([...contributors, newContributor]);
        setAdding(false);
        form.resetFields();
        message.success("Contributor added successfully!");
      })
      .catch(() => message.error("Failed to add contributor"));
  };

  const statusMapping = PROJECT_STATUS_MAPPING[project.status] || {};
  return (
    <Card
      title={
        <Button onClick={handleBack}>
          <BackwardOutlined />
          Back
        </Button>
      }
      bordered={false}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{project.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{project.name}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {project.description}
        </Descriptions.Item>
        <Descriptions.Item label="Hash">{project.hash}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusMapping.color}>{statusMapping.text}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Start Time">
          {moment(project.startTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {moment(project.endTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Token Name">
          {project.tokenName}
        </Descriptions.Item>
        <Descriptions.Item label="Symbol">{project.symbol}</Descriptions.Item>
        <Descriptions.Item label="Total Supply">
          {project.totalSupply.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Stable Token Address">
          {project.stableTokenAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Release Pool Address">
          {project.releasePoolAddress}
        </Descriptions.Item>
      </Descriptions>
      <h2 style={{ marginTop: 20 }}>Contributors</h2>
      <Button
        type="primary"
        onClick={() => setAdding(true)}
        disabled={adding}
        style={{ marginBottom: 10 }}
      >
        Add Contributor
      </Button>
      {adding && (
        <Form form={form} layout="inline" onFinish={addNewContributor}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Enter name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Enter address" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Enter amount" }]}
          >
            <Input type="number" placeholder="On-chain Amount" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => setAdding(false)} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form>
      )}{" "}
      <Table dataSource={project.contributors} columns={columns} rowKey="id" />
    </Card>
  );
};

export default ProjectDetail;
