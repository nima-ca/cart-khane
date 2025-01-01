"use client";

import { getQueryClient } from "@src/utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        rtl
        theme="light"
        autoClose={5000}
        position="top-center"
        closeButton={false}
      />
    </QueryClientProvider>
  );
};

export default Providers;
