export const formatIBAN = (value: string) => {
  if (value === "") return "";

  // Remove any non-digit characters and add IR
  const formatted = "IR" + value.replace(/\D/g, "");
  return formatted;
};

export const formatCreditCard = (value: string) => {
  // Remove any non-digit characters
  const cleaned = value.replace(/\D/g, "").slice(0, 16);

  // Format into groups of 4 separated by dashes
  const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1-");
  return formatted;
};

export const removeDashFromCreditCard = (value: string) => {
  return value.replaceAll("-", "");
};
