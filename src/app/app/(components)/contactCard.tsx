import IconButton from "@src/components/ui/iconButton/iconButton";
import { Contact } from "@src/types/contact.types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

export interface ContactCardProps {
  info: Contact;
  onClick?: () => void;
}

const ContactCard: FC<ContactCardProps> = ({ info, onClick }) => {
  const avatarUrl = info.avatarId
    ? `https://avatar.iran.liara.run/public/${info.avatarId}`
    : `https://avatar.iran.liara.run/username?username=${info.name}`;

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer border border-gray-300 hover:-translate-y-1 active:-translate-y-0 transition-all"
    >
      <div className="flex items-center gap-4">
        <Image
          src={avatarUrl}
          alt={info.name ?? ""}
          className="w-12 h-12 lg:h-16 lg:w-16"
          width={64}
          height={64}
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm">{info.name}</p>
          {info.phoneNumber && (
            <p className="text-xs text-gray-700">{info.phoneNumber}</p>
          )}
        </div>
      </div>

      <IconButton className="text-black">
        <ChevronLeft />
      </IconButton>
    </div>
  );
};

export default ContactCard;
