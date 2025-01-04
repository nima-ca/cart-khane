import apiService from "@src/utils/api/api";
import {
  sendOTPAPIBody,
  validateOTPAPIBody,
  validateOTPAPIResponse,
} from "./apis.types";

export const sendOTPAPI = async (body: sendOTPAPIBody) => {
  const response = await apiService.post("/auth/otp", body);
  return response.data;
};

export const validateOTPAPI = async (body: validateOTPAPIBody) => {
  const response = await apiService.post<validateOTPAPIResponse>(
    "/auth/otp/verification",
    body
  );
  return response.data;
};
