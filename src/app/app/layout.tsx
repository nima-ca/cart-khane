import PrimaryAppLayout from "@src/components/layouts/app/app";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PrimaryAppLayout>{children}</PrimaryAppLayout>;
};

export default AppLayout;
