import axios, { InternalAxiosRequestConfig } from "axios";

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
    // console.log(res);

    // /* refreshed 필드가 true일 경우 새로운 액세스 토큰을 발급받은 것이므로
    //   기존 로컬 스토리지에 담긴 만료된 액세스 토큰을 새 엑세스 토큰으로 교체
    // */
    if (res.data.refreshed) {
      const new_accessToken = res.headers["authorization"];
      localStorage.setItem("accessToken", new_accessToken);
      window.location.replace("/main");
    }

    // /* 해당 에러 발생 시 재로그인 하도록 로그인 화면으로 리다이렉트 */
    // if (
    //   res.data.code === "ACT-001" ||
    //   res.data.code === "RFT-001" ||
    //   res.data.code === "MSE-001" ||
    //   res.data.code === "ATH-001"
    // ) {
    //   localStorage.clear();
    //   window.location.replace("/");
    // }
    return res;
  },
  async (error) => {
    console.error(error);
    return Promise.reject(error);
  }
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
  }
);
export default client;
