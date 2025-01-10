import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";
import { EditUserAPIBody } from "./apis.types";

export const editUserAPI = async (
  body: EditUserAPIBody
): Promise<CoreResponseDto> => {
  const res = await apiService.patch<CoreResponseDto>(`/user`, body);
  return res.data;
};
