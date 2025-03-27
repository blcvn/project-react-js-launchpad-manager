// src/components/ProjectTableColumns.jsx
import { Tag } from "antd";
import React from "react";
import { PROJECT_STATUS_COLOR_MAP } from "../constant/status";
import useProjectActions from "../hooks/useProjectActions";

export const useProjectTableColumns = (onAction) => {
  const { getActionByStatus } = useProjectActions(onAction);
  return [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      fixed: true,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      fixed: true,

      render: (id = 1, record) => (
        <div className="flex gap-2">{getActionByStatus(record.status, id)}</div>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={PROJECT_STATUS_COLOR_MAP[status]}>{status}</Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text, record) => (
        <img src={record.logo} alt="logo" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "PDF",
      dataIndex: "pdf",
      key: "pdf",
      render: (text, record) => (
        <a href={record.pdf} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ),
    },
  ];
};
