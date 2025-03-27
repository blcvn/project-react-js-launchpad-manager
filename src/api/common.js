import request from "../utils/request";

export const makeCommonAPI = (prefix, anyAPI = {}) => {
  const getAll = (params) => {
    return request.get(`${prefix}`, params);
  };

  const getById = (id) => {
    return request.get(`${prefix}/${id}`);
  };

  const create = (data) => {
    return request.post(`${prefix}`, data);
  };

  const update = (data) => {
    return request.put(`${prefix}`, data);
  };

  const remove = (id) => {
    return request.delete(`${prefix}/${id}`);
  };

  return {
    ...anyAPI,
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
