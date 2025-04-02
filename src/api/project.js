import request from "../utils/request";
import { makeCommonAPI } from "./common";

const PREFIX = "/launchpad/api/v1/project";
const v2prefix = "/launchpad/api/v2/project";

const queryProject = (body) => {
  return request.post(`${v2prefix}/query`, body);
};

const approveProjectForReview = async (body) => {
  return request.post(`${v2prefix}/approve-to-reviewing`, body);
};

const approveOnboarding = async (body) => {
  return request.post(`${v2prefix}/submit-review`, body);
};

const approveDone = (body) => {
  return request.post(`${v2prefix}/submit-complete`, body);
};

const projectAPI = makeCommonAPI(PREFIX, {
  queryProject,
  approveProjectForReview,
  approveOnboarding,
  approveDone,
});

export default projectAPI;
