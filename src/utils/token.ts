import { JWT_TOKEN_STORAGE_KEY } from "./api/api";

export const getJwtToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(JWT_TOKEN_STORAGE_KEY);
  }

  return null;
};
