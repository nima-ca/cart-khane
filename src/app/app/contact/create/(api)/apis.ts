import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";
import { AddContactAPIBody } from "./apis.types";

export const addContactAPI = async (
  body: AddContactAPIBody
): Promise<CoreResponseDto> => {
  const res = await apiService.post<CoreResponseDto>("/contact", body);
  return res.data;
};
