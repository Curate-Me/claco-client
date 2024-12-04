import client from "@/apis/client";

export type RefreshTokenResponse = {
  code: string;
  message: string;
  refreshed: boolean;
};

const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token");

    const response = await client.get("/auth/refresh", {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    console.log("Refresh Token Response:", response);

    return newAccessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default refreshToken;
