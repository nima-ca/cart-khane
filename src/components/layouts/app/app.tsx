import { FC, PropsWithChildren } from "react";

const PrimaryAppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="main-container bg-red-500 w-screen h-screen">
        {children}
      </main>
    </>
  );
};

export default PrimaryAppLayout;
