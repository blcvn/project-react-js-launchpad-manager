export const ProjectStatus = {
  NO_USE: "NO_USE",
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  REVIEW: "REVIEWING",
  ONBOARD: "ONBOARD",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  DONE: "DONE",
  DELETED: "DELETED",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
};

export const PROJECT_STATUS_COLOR_MAP = {
  [ProjectStatus.NO_USE]: "#000000", // Black
  [ProjectStatus.DRAFT]: "#808080", // Gray
  [ProjectStatus.SUBMITTED]: "#4682B4", // Steel Blue
  [ProjectStatus.REVIEW]: "#FF8C00", // Dark Orange
  [ProjectStatus.ONBOARD]: "#228B22", // Forest Green
  [ProjectStatus.PROCESSING]: "#1E90FF", // Dodger Blue
  [ProjectStatus.COMPLETED]: "#006400", // Dark Green
  [ProjectStatus.DONE]: "#00008B", // Dark Blue
  [ProjectStatus.DELETED]: "#8B0000", // Dark Red
  [ProjectStatus.CANCELED]: "#696969", // Dim Gray
  [ProjectStatus.REJECTED]: "#B22222", // Firebrick
};

export const PROJECT_STATUS_TEXT_MAP = {
  [ProjectStatus.NO_USE]: "No Use",
  [ProjectStatus.DRAFT]: "Draft",
  [ProjectStatus.SUBMITTED]: "Submitted",
  [ProjectStatus.REVIEW]: "Review",
  [ProjectStatus.ONBOARD]: "Onboard",
  [ProjectStatus.PROCESSING]: "Processing",
  [ProjectStatus.COMPLETED]: "Completed",
  [ProjectStatus.DONE]: "Done",
  [ProjectStatus.DELETED]: "Deleted",
  [ProjectStatus.CANCELED]: "Canceled",
  [ProjectStatus.REJECTED]: "Rejected",
};
