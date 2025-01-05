import { cn } from "@src/utils/cn";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  required?: boolean;
  classNames?: {
    base?: string;
    input?: string;
    label?: string;
    container?: string;
  };
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      endIcon,
      startIcon,
      required,
      classNames,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex items-start flex-col gap-2 w-full",
          classNames?.base
        )}
      >
        {label && (
          <p className={cn("font-bold text-sm mr-1", classNames?.label)}>
            {label} {required && <span className="text-red-500">*</span>}
          </p>
        )}

        <div
          className={cn(
            "flex items-center border border-gray-300 h-10 rounded-lg outline-regal-blue-500 px-4 w-full bg-white gap-1",
            { "outline-red-500 border-red-500": error },
            className,
            classNames?.container
          )}
        >
          {startIcon}
          <input
            {...props}
            ref={ref}
            className={cn(
              "w-full outline-none text-sm lg:text-base",
              classNames?.input
            )}
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
