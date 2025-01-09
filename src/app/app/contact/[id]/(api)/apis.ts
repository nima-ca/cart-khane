import { CoreResponseDto } from "@src/types/api.types";
import apiService from "@src/utils/api/api";
import {
  CreateCardAPIBody,
  CreateCardAPIResponse,
  DeleteCardAPIBody,
  EditCardAPIBody,
  GetCardsListAPIBody,
  GetCardsListAPIResponse,
  GetContactAPIResponse,
} from "./apis.types";

export const getContactAPI = async (
  id: number
): Promise<CoreResponseDto<GetContactAPIResponse>> => {
  const res = await apiService.get<CoreResponseDto<GetContactAPIResponse>>(
    `/contact/${id}`
  );
  return res.data;
};

export const getCardListAPI = async (
  params: GetCardsListAPIBody
): Promise<CoreResponseDto<GetCardsListAPIResponse>> => {
  const res = await apiService.get<CoreResponseDto<GetCardsListAPIResponse>>(
    `/card`,
    { params }
  );
  return res.data;
};

export const createCardAPI = async (
  body: CreateCardAPIBody
): Promise<CoreResponseDto<CreateCardAPIResponse>> => {
  const res = await apiService.post<CoreResponseDto<CreateCardAPIResponse>>(
    `/card`,
    body
  );
  return res.data;
};

export const editCardAPI = async ({
  id,
  ...body
}: EditCardAPIBody): Promise<CoreResponseDto> => {
  const res = await apiService.put<CoreResponseDto>(`/card/${id}`, body);
  return res.data;
};

export const deleteCardAPI = async ({
  id,
  contactId,
}: DeleteCardAPIBody): Promise<CoreResponseDto> => {
  const res = await apiService.delete<CoreResponseDto>(`/card/${id}`, {
    params: { contactId },
  });
  return res.data;
};

export const deleteContactAPI = async (
  id: number
): Promise<CoreResponseDto> => {
  const res = await apiService.delete<CoreResponseDto>(`/contact/${id}`);
  return res.data;
};
