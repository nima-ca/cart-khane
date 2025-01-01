import { FC, PropsWithChildren } from "react";
import PrimaryFooter from "./footer/footer";
import PrimaryHeader from "./header/header";

const PrimaryLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PrimaryHeader />
      <main className="main-container">{children}</main>
      <PrimaryFooter />
    </>
  );
};

export default PrimaryLayout;
