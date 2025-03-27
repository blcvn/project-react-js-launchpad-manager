export const ProjectStatus = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  REVIEW: "Review",
  ONBOARD: "Onboard",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  DONE: "Done",
  DELETED: "Deleted",
  CANCELED: "Canceled",
};

export const PROJECT_STATUS_COLOR_MAP = {
  [ProjectStatus.DRAFT]: "#d3d3d3",
  [ProjectStatus.SUBMITTED]: "#87ceeb",
  [ProjectStatus.REVIEW]: "#ffa500",
  [ProjectStatus.ONBOARD]: "#32cd32",
  [ProjectStatus.PROCESSING]: "#1e90ff",
  [ProjectStatus.COMPLETED]: "#008000",
  [ProjectStatus.DONE]: "#0000ff",
  [ProjectStatus.DELETED]: "#ff0000",
  [ProjectStatus.CANCELED]: "#808080",
};
