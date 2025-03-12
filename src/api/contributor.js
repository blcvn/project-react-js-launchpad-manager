import ENV from "../config/env";
import request from "../utils/request";
const PREFIX = ENV.BASE_URL + "/add-contributors";

const createBatch = (body) => {
  return request.post(`${PREFIX}`, body);
};

const contributorAPI = { createBatch };

export default contributorAPI;
