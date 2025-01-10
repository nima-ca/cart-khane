export const logout = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
    window.location.href = "/auth/login";
  }
};
