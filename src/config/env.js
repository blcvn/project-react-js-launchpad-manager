const origin = window.location.origin;
const getENVConfigFromOrigin = () => {
  const env = {
    GOOGLE_CLIENT: "",
    API_BASE_URL: "",
    IPFS_URL: "",
  };
  if (origin.includes("localhost")) {
    
    env.API_BASE_URL = process.env.REACT_APP_BASE_URL;
    env.IPFS_URL = process.env.REACT_APP_IPFS_URL;
    env.GOOGLE_CLIENT = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return env;
  }

  for (let i = 1; i < 10; i++) {
    const originKey = `REACT_APP_ORIGINAL_URL_${i}`;
    if (!process.env[originKey]) {
      throw Error(`REACT_APP_ORIGINAL_URL_${i} not found`);
    }
    const originUrl = process.env[originKey];
    if (originUrl === origin) {
      env.API_BASE_URL = process.env[`REACT_APP_BASE_URL_${i}`];
      env.IPFS_URL = process.env[`REACT_APP_IPFS_URL_${i}`];
      env.GOOGLE_CLIENT = process.env[`REACT_APP_GOOGLE_CLIENT_ID_${i}`];
      return env;
    }
  }
};

const ENV = getENVConfigFromOrigin();

export default ENV;
