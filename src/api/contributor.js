import request from "../utils/request";
const PREFIX = "/add-contributors";

const createBatch = (body) => {
  return request.post(`${PREFIX}`, body);
};

const contributorAPI = { createBatch };

export default contributorAPI;
