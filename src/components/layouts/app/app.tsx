import { FC, PropsWithChildren } from "react";

const PrimaryAppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="main-container w-screen min-h-svh">{children}</main>
    </>
  );
};

export default PrimaryAppLayout;
