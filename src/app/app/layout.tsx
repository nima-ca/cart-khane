import PrimaryAppLayout from "@src/components/layouts/app/app";
import AuthGuard from "@src/components/layouts/guards/auth";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthGuard>
      <PrimaryAppLayout>{children}</PrimaryAppLayout>;
    </AuthGuard>
  );
};

export default AppLayout;
