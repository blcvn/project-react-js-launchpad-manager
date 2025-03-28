// src/hooks/useProjectActions.js
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const useProjectActions = (actionHandler) => {
  debugger;
  const {
    handleApproveToReview,
    handleApproveToOnboard,
    handleReject,
    handleDone,
  } = actionHandler;

  const getActionByStatus = (status, id) => {
    switch (status) {
      case "Submitted":
        return (
          <Tooltip title="Approve for review">
            <SendOutlined
              style={{
                fontSize: "20px",
                color: "#1890ff",
                cursor: "pointer",
              }}
              onClick={() => handleApproveToReview(id)}
            />
          </Tooltip>
        );

      case "Review":
        return (
          <>
            <Tooltip title="Approve for Onboard">
              <CheckCircleOutlined
                style={{
                  fontSize: "20px",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
                onClick={() => handleApproveToOnboard(id)}
              />
            </Tooltip>
            <Tooltip title="Reject">
              <CloseCircleOutlined
                style={{
                  fontSize: "20px",
                  color: "#ff4d4f",
                  cursor: "pointer",
                }}
                onClick={() => handleReject(id)}
              />
            </Tooltip>
          </>
        );

      case "Completed":
        return (
          <>
            <Tooltip title="Confirm done">
              <FileDoneOutlined
                style={{
                  fontSize: "20px",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
                onClick={() => handleDone(id)}
              />
            </Tooltip>
            <Tooltip title="Reject">
              <CloseCircleOutlined
                style={{
                  fontSize: "20px",
                  color: "#ff4d4f",
                  cursor: "pointer",
                }}
                onClick={() => handleReject(id)}
              />
            </Tooltip>
          </>
        );
      case "Draft":
      case "Onboard":
      case "Processing":
      case "Done":
      case "Deleted":
      case "Canceled":
      default:
        return null;
    }
  };

  return { getActionByStatus };
};

export default useProjectActions;
