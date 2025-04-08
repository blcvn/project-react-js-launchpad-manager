const origin = window.location.origin;
const getENVConfigFromOrigin = () => {
  const env = {
    GOOGLE_CLIENT: "",
    API_BASE_URL: "",
    IPFS_URL: "",
  };
  console.log("origin", env);
  if (origin.includes("localhost")) {
    env.API_BASE_URL = import.meta.env.VITE_BASE_URL;
    env.IPFS_URL = import.meta.env.VITE_IPFS_URL;
    env.GOOGLE_CLIENT = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return env;
  }

  for (let i = 1; i < 10; i++) {
    const originKey = `VITE_ORIGINAL_URL_${i}`;
    if (!import.meta.env[originKey]) {
      throw Error(`VITE_ORIGINAL_URL_${i} not found`);
    }
    const originUrl = import.meta.env[originKey];
    if (originUrl === origin) {
      env.API_BASE_URL = import.meta.env[`VITE_BASE_URL_${i}`];
      env.IPFS_URL = import.meta.env[`VITE_IPFS_URL_${i}`];
      env.GOOGLE_CLIENT = import.meta.env[`VITE_GOOGLE_CLIENT_ID_${i}`];
      return env;
    }
  }
};

const ENV = getENVConfigFromOrigin();

export default ENV;
