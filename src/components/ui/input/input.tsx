import { cn } from "@src/utils/cn";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex items-start flex-col gap-2 w-full min-h-24">
      {label && <p className="font-bold text-sm mr-1">{label}</p>}
      <input
        className={cn(
          "border border-gray-300 h-10 rounded-lg outline-regal-blue-500 px-4 w-full",
          { "outline-red-500 border-red-500": error },
          className
        )}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
