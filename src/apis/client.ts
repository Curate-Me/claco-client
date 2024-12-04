import axios, { InternalAxiosRequestConfig } from "axios";
import refreshToken from "./refreshToken";

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": `${import.meta.env.VITE_SERVER_URL}`,
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (res) => {
    if (res.data.refreshed) {
      const new_accessToken = res.headers["authorization"];
      localStorage.setItem("accessToken", new_accessToken);
      window.location.replace("/main");
    }

    // /* 해당 에러 발생 시 재로그인 하도록 로그인 화면으로 리다이렉트 */
    if (
      res.data.code === "ACT-001" ||
      res.data.code === "RFT-001" ||
      res.data.code === "MSE-001" ||
      res.data.code === "ATH-001"
    ) {
      localStorage.clear();
      window.location.replace("/");
    }
    return res;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await refreshToken();

        return client.request(error.config);
      } catch (refreshError) {
        console.error(refreshError);

        localStorage.clear();
        window.location.replace("/");
      }
    }

    console.error(error);
    return Promise.reject(error);
  },
);

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.withCredentials = true;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `${accessToken}`;
    } else {
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default client;
