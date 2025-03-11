import ENV from "../config/env";
import request from "../utils/request";
const PREFIX = ENV.BASE_URL + "/user";

const register = ({ email, password, name }) => {
  return request.post(`${PREFIX}/register`, {
    email: email,
    password: password,
    name,
  });
};

const login = ({ email, password }) => {
  return request.post(`${PREFIX}/login`, {
    email: email,
    password: password,
  });
};

const authAPI = { login, register };

export default authAPI;
