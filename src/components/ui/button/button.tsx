"use client";

import { cn } from "@src/utils/cn";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, FC, MouseEvent } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
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
        "flex items-center gap-2 justify-center bg-regal-blue-500 py-2 px-4 rounded-md text-white hover:opacity-90 transition-all active:opacity-100 font-bold text-sm xl:text-base",
        {
          "cursor-not-allowed opacity-70 hover:opacity-70 active:opacity-70":
            disabled || loading,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
