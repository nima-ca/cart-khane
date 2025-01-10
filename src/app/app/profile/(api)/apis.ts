import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";

export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  avatarId: number | null;
}

export const getUserProfileAPI = async (): Promise<CoreResponseDto<User>> => {
  const res = await apiService.get<CoreResponseDto<User>>(`/user`);
  return res.data;
};

export const deleteUserAPI = async (): Promise<CoreResponseDto> => {
  const res = await apiService.delete<CoreResponseDto>(`/user`);
  return res.data;
};
