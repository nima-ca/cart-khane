"use client";

import { getJwtToken } from "@src/utils/token";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const jwtToken = getJwtToken();

  useEffect(() => {
    if (!jwtToken) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
