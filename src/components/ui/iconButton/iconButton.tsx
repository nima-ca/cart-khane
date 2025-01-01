"use client";

import { cn } from "@src/utils/cn";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, FC, MouseEvent } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  loading?: boolean;
}

const IconButton: FC<ButtonProps> = ({
  children,
  className,
  href,
  onClick,
  disabled,
  loading,
  ...props
}) => {
  const router = useRouter();

  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (disabled || loading) return;

    if (href) {
      router.push(href);
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={cn(
        "flex items-center gap-2 justify-center p-2 rounded-md text-white hover:bg-gray-200 transition-all active:bg-gray-300",
        {
          "cursor-not-allowed bg-gray-200 hover:bg-gray-200 active:bg-gray-200":
            disabled || loading,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {!loading && children}
    </button>
  );
};

export default IconButton;
