import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";
import { EditContactAPIBody } from "./apis.types";

export const editContactAPI = async ({
  id,
  ...body
}: EditContactAPIBody): Promise<CoreResponseDto> => {
  const res = await apiService.put<CoreResponseDto>(`/contact/${id}`, body);
  return res.data;
};
