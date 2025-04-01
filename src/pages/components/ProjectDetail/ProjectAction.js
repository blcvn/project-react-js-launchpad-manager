import { CheckOutlined, StopOutlined } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import { PROJECT_STATUS_COLOR_MAP, ProjectStatus } from "../../../constant/status.js";
export const getActionByStatus = (status, id, handlers) => {
  const {
    handleAcceptOnboard,
    handleRejectOnboard,
    handleAcceptDone,
    handleRejectDone,
  } = handlers;

  switch (status) {
    case ProjectStatus.REVIEWING:
      return (
        <>
          <Tooltip title="Accept onboard">
            <CheckOutlined
              onClick={() => handleAcceptOnboard(id)}
              className="action-icon !text-blue-500 cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Reject onboard">
            <StopOutlined
              onClick={() => handleRejectOnboard(id)}
              className="action-icon !text-red-500 cursor-pointer"
            />
          </Tooltip>
        </>
      );
    case ProjectStatus.COMPLETED:
      return (
        <>
          <Tooltip title="Accept done">
            <CheckOutlined
              onClick={() => handleAcceptDone(id)}
              className="action-icon !text-blue-500 cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Reject done">
            <StopOutlined
              onClick={() => handleRejectDone(id)}
              className="action-icon !text-red-500 cursor-pointer"
            />
          </Tooltip>
        </>
      );

    case "Done":
    case "Deleted":
    case "Canceled":
    case "Draft":
    case "Submitted":
    case "Onboard":
    case "Processing":
    default:
      return null;
  }
};

export const renderStatusTag = (status) => (
  <Tag color={PROJECT_STATUS_COLOR_MAP[status]}>{status}</Tag>
);
