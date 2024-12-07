import client from "./client";

export type UserInformationResponse = {
  code: string;
  message: string;
};

export type UserInformationRequest = {
  nickname: string;
  gender: string;
  age: number;
  minPrice: number;
  maxPrice: number;
  regionPreferences: { preferenceRegion: string }[];
  typePreferences: { preferenceType: string }[];
  categoryPreferences: { preferenceCategory: string }[];
};

const submitUserInformation = (userInfo: UserInformationRequest) => {
  return client.post<UserInformationResponse>(`/members`, userInfo);
};

// const useUserInformationSubmit = async (userInfo: UserInformationRequest) => {
//   try {
//     const response = await client.post<UserInformationResponse>(
//       `/members`,
//       userInfo
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export default submitUserInformation;
