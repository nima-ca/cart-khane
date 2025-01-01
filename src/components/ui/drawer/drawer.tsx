import { cn } from "@src/utils/cn";
import { FC, PropsWithChildren } from "react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  classname?: string;
}

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  isOpen,
  onClose,
  children,
  classname,
}) => {
  return (
    <>
      <div
        className={cn(
          "w-full max-w-80 bg-white h-dvh translate-x-80 fixed top-0 right-0 transition-all z-10",
          { "translate-x-0": isOpen },
          classname
        )}
      >
        {children}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="w-screen h-dvh bg-black/20 fixed top-0 right-0 z-0"
        />
      )}
    </>
  );
};

export default Drawer;
