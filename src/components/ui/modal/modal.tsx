import { cn } from "@src/utils/cn";
import { FC, PropsWithChildren } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  classname?: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  classname,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all z-10 w-full",
            classname
          )}
        >
          {children}
        </div>
      )}

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

export default Modal;
