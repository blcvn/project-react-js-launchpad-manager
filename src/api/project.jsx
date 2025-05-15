import request from "../utils/request";
import { makeCommonAPI } from "./common";

const PREFIX = "/launchpad/api/v1/project";
const V2_PREFIX = "/launchpad/api/v2/project";
const V3_PREFIX = "/launchpad/api/v3";

const queryProject = (params) => {
  return request.get(`${V3_PREFIX}/admin/list-project`, params);
};

const queryProjectById = (body) => {
  return request.post(`${V2_PREFIX}/query`, body);
};

const approveProjectForReview = async (body) => {
  return request.post(`${V3_PREFIX}/projects/submit-review`, body);
};

const approveOnboarding = async (body) => {
  return request.post(`${V3_PREFIX}/projects/change-status`, body);
};

const approveDone = (body) => {
  return request.post(`${V2_PREFIX}/confirm-completed`, body);
};

const projectAPI = makeCommonAPI(PREFIX, {
  queryProject,
  approveProjectForReview,
  approveOnboarding,
  approveDone,
  queryProjectById,
});

export default projectAPI;
