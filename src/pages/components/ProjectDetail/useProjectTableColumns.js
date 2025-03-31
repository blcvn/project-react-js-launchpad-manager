// src/components/ProjectTableColumns.jsx
import { EyeFilled } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Flex } from "../../../components/button/styled";
import { PROJECT_STATUS_COLOR_MAP, PROJECT_STATUS_TEXT_MAP } from "../../../constant/status";
import { getActionByStatus } from "./ProjectAction";

export const useProjectTableColumns = (handlers) => {
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
        <Flex>
          <Tooltip title="View">
            <EyeFilled
              className="cursor-pointer !text-blue-500"
              onClick={() => handlers.handleViewDetail()}
            />
          </Tooltip>
          {getActionByStatus(record.status, id, handlers)}
        </Flex>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      fixed: true,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (time) => dayjs(time).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (time) => dayjs(time).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={PROJECT_STATUS_COLOR_MAP[status]}>{PROJECT_STATUS_TEXT_MAP[status]}</Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
