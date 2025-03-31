import request from "../utils/request";
const PREFIX =  "/user";

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

const loginWithGoogle = ({ token }) => {
  return request.post(`${PREFIX}/login-with-google`, {
    token
  });
};

const authAPI = { login, register,loginWithGoogle };

export default authAPI;
