export const concatName = (
  firstName?: string | null,
  lastName?: string | null
) => {
  if (!firstName || !lastName) {
    return undefined;
  }

  return `${firstName} ${lastName}`;
};

export const getAvatarUrl = (
  name?: string | null,
  avatarId?: number | null
) => {
  return avatarId
    ? `https://avatar.iran.liara.run/public/${avatarId}`
    : `https://avatar.iran.liara.run/username?username=${name ?? "کاربر"}`;
};
