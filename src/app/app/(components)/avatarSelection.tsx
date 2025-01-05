import { cn } from "@src/utils/cn";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

export interface AvatarSelectionProps {
  id: number;
  selectedAvatarId: number;
  onClick: () => void;
}

const AvatarSelection: FC<AvatarSelectionProps> = ({
  id,
  onClick,
  selectedAvatarId,
}) => {
  const isSelected = selectedAvatarId === id;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center cursor-pointer hover:opacity-80 rounded-full relative outline-regal-blue-500"
      )}
    >
      <Image
        src={`https://avatar.iran.liara.run/public/${id}`}
        alt="avatar"
        className={cn("w-12 h-12 lg:w-20 lg:h-20 rounded-full", {
          "border-2 border-green-800": isSelected,
        })}
        width={80}
        height={80}
      />

      {isSelected && (
        <CheckCircle className="absolute bottom-0 right-0 fill-green-800 text-white w-4 h-4" />
      )}
    </button>
  );
};

export default AvatarSelection;
