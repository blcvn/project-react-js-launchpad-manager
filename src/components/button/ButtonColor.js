// ActionButton.jsx
import React from "react";
import { ButtonColorStyles } from "../components/button/styled";

const ActionButton = ({ status, id, onAction }) => {
  const getButtonProps = (status) => {
    switch (status) {
      case "Draft":
        return {
          label: "Submit",
          color: "#f0f0f0",
          action: () => onAction("submit", id),
        };
      case "Submitted":
        return {
          label: "Approve",
          color: "#B2DF8A",
          action: () => onAction("approve", id),
        };
      case "Review":
        return {
          label: "Waiting for review",
          color: "#FDBF62",
          action: () => onAction("review", id),
        };
      case "Onboard":
        return {
          label: "Start Project",
          color: "#A6CEE3",
          action: () => onAction("start", id),
        };
      case "Processing":
        return {
          label: "Complete Project",
          color: "#FF7F00",
          action: () => onAction("complete", id),
        };
      case "Completed":
        return {
          label: "Submit Docs",
          color: "#FB9A99",
          action: () => onAction("submitDocs", id),
        };
      case "Done":
        return {
          label: "Project Done",
          color: "#33A02C",
          action: () => onAction("done", id),
        };
      case "Deleted":
        return {
          label: "Project Removed",
          color: "#E31A1C",
          action: () => onAction("delete", id),
        };
      case "Canceled":
        return {
          label: "Canceled",
          color: "#E31A1C",
          action: () => onAction("cancel", id),
        };
      default:
        return null;
    }
  };

  const buttonProps = getButtonProps(status);

  return buttonProps ? (
    <ButtonColorStyles onClick={buttonProps.action} color={buttonProps.color}>
      {buttonProps.label}
    </ButtonColorStyles>
  ) : null;
};

export default ActionButton;
