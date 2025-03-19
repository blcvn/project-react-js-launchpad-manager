import { BackwardOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Spin, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import projectAPI from "../api/project";
import { PROJECT_STATUS_MAPPING } from "../utils/mapping";
import { create } from "ipfs-http-client";

const ipfs = create({ url: process.env.REACT_APP_IPFS_URL, protocol: "https" });
const ProjectDetail = () => {
  const { projectId } = useParams(); // Lấy projectId từ URL

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [contributors, setContributors] = useState([]);

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

  const fetchJsonByHash = async (hash) => {
    try {
      let content = "";
      for await (const chunk of ipfs.cat(hash)) {
        content += new TextDecoder().decode(chunk);
      }
      return JSON.parse(content);
    } catch (error) {
      console.error("Error fetching JSON by hash:", error);
      return null;
    }
  };
  

  useEffect(() => {
    const getFile = async () => {
      if (project && project.cid) {
        const jsonData = await fetchJsonByHash(project.cid);
        console.log("Fetched JSON data:", jsonData);
      }
    };
    getFile();
  }, [project]);

  if (loading) return <Spin size="large" />;
  if (!project) return <p>Project not found</p>;

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  const handleBack = () => {
    history.push("/project");
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
      <Descriptions bordered column={1} title="Project Metadata">
        <Descriptions.Item label="ID">{project.id}</Descriptions.Item>
        <Descriptions.Item label="BlockchainID">
          {project.blockchainId}
        </Descriptions.Item>
        <Descriptions.Item label="CID">{project.cid}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusMapping.color}>{statusMapping.text}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Start Time">
          {moment(project.startTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {moment(project.endTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Token Address">
          {project.tokenAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Total Amount">
          {project.totalAmount ? project.totalAmount / 1e18 : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Pool Address">
          {project.poolAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Owner">{project.owner}</Descriptions.Item>
        <Descriptions.Item label="Accept Off-Chain">
          {project.acceptOffChain ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Reject Off-Chain">
          {project.rejectOffChain ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Accept On-Chain">
          {project.acceptOnChain ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Reject On-Chain">
          {project.rejectOnChain ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Release Off-Chain">
          {project.releaseOffChain ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Release On-Chain">
          {project.releaseOnChain ? "Yes" : "No"}
        </Descriptions.Item>
      </Descriptions>
      <h2 style={{ marginTop: 20 }}>Contributors</h2>

      <Table dataSource={project.contributors} columns={columns} rowKey="id" />
    </Card>
  );
};

export default ProjectDetail;
