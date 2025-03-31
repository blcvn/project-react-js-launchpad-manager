export const ProjectStatus = {
  NO_USE: 0,
  DRAFT: 1,
  SUBMITTED: 2,
  REVIEWING: 3,
  ONBOARD: 4,
  PROCESSING: 5,
  COMPLETED: 6,
  DONE: 7,
  DELETED: 8,
  CANCELED: 9,
  REJECTED: 10,
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

export const PROJECT_STATUS_TEXT_MAP = {
  [ProjectStatus.DRAFT]: "Draft",
  [ProjectStatus.SUBMITTED]: "Submitted",
  [ProjectStatus.REVIEW]: "Reviewing",
  [ProjectStatus.ONBOARD]: "Onboard",
  [ProjectStatus.PROCESSING]: "Processing",
  [ProjectStatus.COMPLETED]: "Completed",
  [ProjectStatus.DONE]: "Done",
  [ProjectStatus.DELETED]: "Deleted",
  [ProjectStatus.CANCELED]: "Canceled",
  [ProjectStatus.REJECTED]: "Rejected",
}