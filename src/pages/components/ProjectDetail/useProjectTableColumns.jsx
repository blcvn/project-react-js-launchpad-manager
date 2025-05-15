import { EyeFilled } from "@ant-design/icons";
import { Image, Tag, Tooltip } from "antd";
import React from "react";
import { Flex } from "../../../components/button/styled";
import { EllipsisLongText } from "../../../components/styled/EllipsisLongText";
import {
  PROJECT_STATUS_COLOR_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "../../../constant/status";
import { getActionByStatus } from "./ProjectAction";

export const useProjectTableColumns = (handlers, params) => {
  return [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => params.page * params.size + index + 1,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Flex>
          <Tooltip title="View">
            <EyeFilled
              className="cursor-pointer !text-blue-500"
              onClick={() => handlers.handleViewDetail(id)}
            />
          </Tooltip>
          {getActionByStatus(record.status, id, handlers)}
        </Flex>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "icon",
      key: "icon",
      render: (icon = {}) =>
        icon?.content &&
        icon?.contentType && (
          <Image
            src={[icon.contentType, icon.content].join(",")}
            alt="logo"
            width={50}
            preview={false}
          />
        ),
      responsive: ["md"],
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <div style={{ maxWidth: "200px" }}>
          <EllipsisLongText>{description}</EllipsisLongText>
        </div>
      ),
    },
    { title: "Owner", dataIndex: ["owner", "username"], key: "owner" }, // Translated title
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={PROJECT_STATUS_COLOR_MAP[status]}>
          {PROJECT_STATUS_TEXT_MAP[status]}
        </Tag>
      ),
    },
    {
      title: "Amount", // Translated title
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (description) => (
    //     <div style={{ maxWidth: "200px" }}>
    //       <EllipsisLongText>{description}</EllipsisLongText>
    //     </div>
    //   ),
    // },
  ];
};
