import request from "../utils/request";
const PREFIX = "/launchpad/api/v1/user";
const V3_PREFIX = "/launchpad/api/v3/user";

const search = ({ page, size }) => {
  return request.get(`${V3_PREFIX}/search`, { page, size });
};

const create = ({ email, password, name }) => {
  return request.post(`${PREFIX}`, {
    email: email,
    password: password,
    name,
  });
};

const userAPI = { create, search };

export default userAPI;
