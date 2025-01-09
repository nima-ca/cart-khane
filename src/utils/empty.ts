export const checkEmptyString = (value: string) => {
  return value !== "" ? value : undefined;
};

export const falsyString = (value: string | null | undefined) => {
  if (value) {
    return value;
  }

  return "-";
};
