import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";
import { GetContactListAPIBody, GetContactListAPIResponse } from "./apis.types";

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
