import client from "@/apis/client";

export type NickNameCheckResponse = {
  code: string;
  message: string;
};

const nickNameCheck = async (nickName: string) => {
  const response = await client.get<NickNameCheckResponse>(
    `/members/check-nickname?nickname=${nickName}`
  );
  return response.data;
};

export default nickNameCheck;
