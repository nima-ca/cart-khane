import { FC, PropsWithChildren } from "react";

const PrimaryLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default PrimaryLayout;
