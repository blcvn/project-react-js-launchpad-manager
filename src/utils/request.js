import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const request = {
  token: localStorage.getItem("token") || null,

  setToken(newToken) {
    this.token = newToken;
    localStorage.setItem("token", newToken);
  },

  removeToken() {
    localStorage.clear()
    this.token = null;
  },

  get(url, params = {}) {
    return axiosClient.get(url, {
      params,
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
  },

  post(url, data = {}) {
    return axiosClient.post(url, data, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
  },

  put(url, data = {}) {
    return axiosClient.put(url, data, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
  },

  delete(url) {
    return axiosClient.delete(url, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
  },
};

axiosClient.interceptors.request.use(
  (config) => {
    if (request.token) {
      config.headers.Authorization = `Bearer ${request.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    if (error.response.status === 401 || error.response.status === 403) {
      request.removeToken();
      window.location.href = "/sign-in";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default request;
