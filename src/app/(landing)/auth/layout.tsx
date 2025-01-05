import GuestGuard from "@src/components/layouts/guards/guest";
import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default AuthLayout;
