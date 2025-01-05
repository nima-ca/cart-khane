import { cn } from "@src/utils/cn";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className, endIcon, startIcon, required, ...props },
    ref
  ) => {
    return (
      <div className="flex items-start flex-col gap-2 w-full">
        {label && (
          <p className="font-bold text-sm mr-1">
            {label} {required && <span className="text-red-500">*</span>}
          </p>
        )}

        <div
          className={cn(
            "flex items-center border border-gray-300 h-10 rounded-lg outline-regal-blue-500 px-4 w-full bg-white",
            { "outline-red-500 border-red-500": error },
            className
          )}
        >
          {startIcon}
          <input
            {...props}
            ref={ref}
            className="w-full outline-none text-sm lg:text-base"
          />
          {endIcon}
        </div>

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
