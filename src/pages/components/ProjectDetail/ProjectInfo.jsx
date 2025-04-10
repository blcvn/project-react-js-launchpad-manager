import PropTypes from "prop-types";
import React, { useState } from "react";

import { Descriptions, Divider, Image, List, Space, Typography } from "antd";
import PreviewPDFModal from "../../../components/Modal/PreviewPDFModal";
import { Base64ToFile } from "../../../utils/string";
const { Title, Text } = Typography;

const ProjectInfo = ({ project = {} }) => {
  const [previewFile, setPreviewFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handleFilePreview = (info) => () => {
    const filename = info.filename;
    if (filename.endsWith(".pdf")) {
      setPreviewFile(
        Base64ToFile(`${info.content_type},${info.content}`, info.filename)
      );
      return;
    }
    if (filename.endsWith(".png") || filename.endsWith(".jpg")) {
      setPreviewImage(
        `${info.content_type || "data:image/png;base64"},${info.content}`
      );
      setPreviewOpen(true);
    }
  };
  console.log(previewImage);
  return (
    <div>
      <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-6 text-center">
        Project information
      </h2>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full border-2 border-gray-300"
            src={
              project.icon?.contentType && project.icon?.content
                ? [project.icon.contentType, project.icon.content].join(",")
                : "data:image/png;base64,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"
            }
            alt="Project Logo"
          />
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Owner">{project?.owner?.username}</Descriptions.Item>
          <Descriptions.Item label="Project Name">
            {project.name}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {project.description}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{project.status}</Descriptions.Item>
        </Descriptions>

        <div>
          <Title level={4}>Project Files</Title>
          {project.infos?.length > 0 ? (
            <List
              bordered
              dataSource={project.infos}
              renderItem={(info) => (
                <List.Item
                  actions={[<a onClick={handleFilePreview(info)}>Preview</a>]}
                >
                  <Text>{info.filename}</Text>
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary">No files available.</Text>
          )}
        </div>

        <div>
          <Title level={4}>Completed Files</Title>
          {project.completedInfos?.length > 0 ? (
            <List
              bordered
              dataSource={project.completedInfos}
              renderItem={(info) => (
                <List.Item
                  actions={[<a onClick={handleFilePreview(info)}>Preview</a>]}
                >
                  <Text>{info.filename}</Text>
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary">No completed files yet.</Text>
          )}
        </div>

        {(project.reject_review_reason || project.reject_done_reason) && (
          <>
            <Divider />
            <div>
              <Title level={4}>Rejection Reasons</Title>
              <Descriptions bordered column={1}>
                {project.reject_review_reason && (
                  <Descriptions.Item label="Review Rejection">
                    {project.reject_review_reason}
                  </Descriptions.Item>
                )}
                {project.reject_done_reason && (
                  <Descriptions.Item label="Completion Rejection">
                    {project.reject_done_reason}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          </>
        )}
      </Space>
      <PreviewPDFModal
        title={"Preview File"}
        open={!!previewFile}
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          
        />
      )}
    </div>
  );
};

ProjectInfo.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.shape({
      filename: PropTypes.string,
      content: PropTypes.string,
    }),
    owner: PropTypes.string,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
      })
    ),
    donators: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
      })
    ),
    infos: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string,
        content: PropTypes.string,
      })
    ),
    completed_infos: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string,
        content: PropTypes.string,
      })
    ),
    reject_review_reason: PropTypes.string,
    reject_done_reason: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default ProjectInfo;
