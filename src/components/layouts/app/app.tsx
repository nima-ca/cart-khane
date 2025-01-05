import { FC, PropsWithChildren } from "react";
import PrimaryAppHeader from "./header";

const PrimaryAppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PrimaryAppHeader />
      <main className="main-container w-screen min-h-svh">{children}</main>
    </>
  );
};

export default PrimaryAppLayout;
