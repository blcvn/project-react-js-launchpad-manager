import request from "../utils/request";
import { makeCommonAPI } from "./common";

const PREFIX =  "/project";

const approveProjectForReview = async (projectId) => {
  return request.put(`${PREFIX}/approve-review/${projectId}`);
};
const approveProjectForOnboarding = async (projectId) => {
  return request.put(`${PREFIX}/approve-onboard/${projectId}`);
};
const rejectProject = (id) => {
  return request.put(`${PREFIX}/reject/${id}`);
};

const projectAPI = makeCommonAPI(PREFIX, {
  approveProjectForReview,
  approveProjectForOnboarding,
  rejectProject,
});

export default projectAPI;
