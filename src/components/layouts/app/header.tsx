import logoImg from "@images/logo/logo.png";
import IconButton from "@src/components/ui/iconButton/iconButton";
import { UserCircle } from "lucide-react";
import Image from "next/image";

const PrimaryAppHeader = () => {
  return (
    <header className="flex items-center justify-between w-full border-b !mb-5 border-gray-200 px-4 main-container">
      <div className="flex items-center justify-center py-4">
        <Image src={logoImg} alt="کارت خانه" width={40} height={40} />
        <h1 className="font-bold text-lg mt-2 text-regal-blue-500">
          کارت خانه
        </h1>
      </div>
      <IconButton className="text-regal-blue-500 mt-2" type="button">
        <UserCircle />
      </IconButton>
    </header>
  );
};

export default PrimaryAppHeader;
