import request from "../utils/request";
const PREFIX = "/user";

const search = ({ page, size }) => {
  return request.get(`${PREFIX}`, { page, size });
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
