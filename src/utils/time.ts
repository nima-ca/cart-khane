export const seconds = (value: number) => {
  return value * 1000;
};

export const minutes = (value: number) => {
  return value * seconds(60);
};
