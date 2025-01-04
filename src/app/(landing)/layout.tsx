import PrimaryLayout from "@src/components/layouts/primary/primary";
import { FC, PropsWithChildren } from "react";

const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default LandingLayout;
