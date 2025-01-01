import logoImg from "@images/logo/logo.png";
import Button from "@src/components/ui/button/button";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobileMenu";

const PrimaryHeader = () => {
  return (
    <header>
      <nav className="main-container w-full flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoImg} alt="لوگو" className="w-12 lg:w-14" priority />
          <p className="text-lg lg:text-2xl mt-2 font-bold text-regal-blue-700">
            کارت خانه
          </p>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          <Link
            className="font-medium hover:opacity-70 active:opacity-100 transition-all"
            href="/"
          >
            صفحه اصلی
          </Link>{" "}
          |
          <Link
            className="font-medium hover:opacity-70 active:opacity-100 transition-all"
            href="/"
          >
            درباره ما
          </Link>
          |
          <Link
            className="font-medium hover:opacity-70 active:opacity-100 transition-all"
            href="/"
          >
            تماس با ما
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Button href="/auth/login">ورود به اپلیکیشن</Button>
        </div>

        {/* Mobile */}
        <MobileMenu />
      </nav>
    </header>
  );
};

export default PrimaryHeader;
