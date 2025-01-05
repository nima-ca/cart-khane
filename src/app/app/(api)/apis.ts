import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";
import {
  AddContactAPIBody,
  GetContactListAPIBody,
  GetContactListAPIResponse,
} from "./apis.types";

export const getContactListAPI = async (
  params: GetContactListAPIBody
): Promise<CoreResponseDto<GetContactListAPIResponse>> => {
  const res = await apiService.get<CoreResponseDto<GetContactListAPIResponse>>(
    "/contact",
    {
      params,
    }
  );
  return res.data;
};

export const addContactAPI = async (
  body: AddContactAPIBody
): Promise<CoreResponseDto> => {
  const res = await apiService.post<CoreResponseDto>("/contact", body);
  return res.data;
};
