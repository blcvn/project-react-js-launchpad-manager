import ENV from "../config/env";
import request from "../utils/request";

const PREFIX = ENV.BASE_URL + "/project";

const search = ({ page, size }) => {
  return request.get(`${PREFIX}`, { page, size });
};
const create = (body) => {
  return request.post(`${PREFIX}`, body);
};
const accept = (id) => {
  return request.put(`${PREFIX}/accept/${id}`);
};
const reject = (id) => {
  return request.put(`${PREFIX}/reject/${id}`);
};

const release = (id) => {
  return request.put(`${PREFIX}/release/${id}`);
};

const getProjectDetail = (id) => {
  return request.get(`${PREFIX}/${id}`);
};
const projectAPI = {
  create,
  search,
  accept,
  reject,
  getProjectDetail,
  release,
};

export default projectAPI;
