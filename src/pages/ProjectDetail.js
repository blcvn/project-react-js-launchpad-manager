import { BackwardOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Spin, Table, Tag } from "antd";
import { create } from "ipfs-http-client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import projectAPI from "../api/project";
import { PROJECT_STATUS_MAPPING } from "../utils/mapping";

const ipfs = create({ url: process.env.REACT_APP_IPFS_URL, protocol: "https" });
const ProjectDetail = () => {
  const { projectId } = useParams(); // Lấy projectId từ URL

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [contributors, setContributors] = useState([]);
  const [cidData, setCidData] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
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

  const loadImgURL = async (cid, mime, limit) => {
    if (cid == "" || cid == null || cid == undefined) {
      return;
    }
    const content = [];
    for await (const chunk of ipfs.cat(cid, { length: limit })) {
      content.push(chunk);
    }
    return URL.createObjectURL(new Blob(content, { type: mime }));
  };

  const downloadFile = async (cid) => {
    try {
      const chunks = [];
      for await (const chunk of ipfs.cat(cid)) {
        chunks.push(chunk);
      }
      const blob = new Blob(chunks, { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  useEffect(() => {
    const getFile = async () => {
      if (project && project.cid) {
        const jsonData = await fetchJsonByHash(project.cid);
        setCidData(jsonData);

        if (jsonData.logoCid) {
          const logoContent = await loadImgURL(
            jsonData.logoCid,
            "image/png",
            524288
          );
          setLogoUrl(logoContent);
        }
        if (jsonData.pdfCid) {
          downloadFile(jsonData.pdfCid);
        }
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
        {logoUrl && (
          <Descriptions.Item label="Logo">
            <img
              src={logoUrl}
              alt="Project Logo"
              style={{ maxWidth: "100px" }}
            />
          </Descriptions.Item>
        )}
        <Descriptions.Item label="PDF">
          <a href={pdfUrl}> View pdf</a>
          {/* <div>
            <PdfViewer pdfFile={"https://ipfs.io/ipfs/" + pdfUrl} />
          </div> */}
        </Descriptions.Item>
      </Descriptions>
      <h2 style={{ marginTop: 20 }}>Contributors</h2>

      <Table dataSource={project.contributors} columns={columns} rowKey="id" />
    </Card>
  );
};

export default ProjectDetail;
