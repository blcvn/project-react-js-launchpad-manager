import request from "../utils/request";
const PREFIX = "/launchpad/api/v1/user";
const V3_PREFIX = "/launchpad/api/v3";

const register = ({ email, password, name }) => {
  return request.post(`${PREFIX}/register`, {
    email: email,
    password: password,
    name,
  });
};

const login = ({ email, password }) => {
  return request.post(`${V3_PREFIX}/login`, {
    email: email,
    password: password,
  });
};

const loginWithGoogle = ({ token }) => {
  return request.post(`${V3_PREFIX}/user/login-with-google`, {
    token,
  });
};

const authAPI = { login, register, loginWithGoogle };

export default authAPI;
