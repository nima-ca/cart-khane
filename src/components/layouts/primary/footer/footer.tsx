import logoImg from "@images/logo/logo-white.png";
import { GithubIcon } from "@src/components/icons/github";
import { LinkedinIcon } from "@src/components/icons/linkedin";
import { XIcon } from "@src/components/icons/x";
import Image from "next/image";
import Link from "next/link";

const PrimaryFooter = () => {
  return (
    <footer className="bg-regal-blue-600 text-white py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 main-container px-4 gap-5 lg:gap-10 justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Image src={logoImg} alt="لوگو" className="w-16 lg:w-20" />
            <p className="text-lg lg:text-xl font-bold mt-3">کارت خانه</p>
          </div>
          <p className="text-sm lg:text-base">
            کارت‌خانه اپلیکیشنی برای مدیریت و ذخیره امن اطلاعات کارت‌های اعتباری
            شماست. هدف ما ایجاد فضایی امن و قابل اعتماد برای کاربران است که به
            راحتی بتوانند کارت های اعتباری خود را مدیریت کنند.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-8 lg:items-center">
          <p className="font-bold text-sm lg:text-base">لینک‌های مفید:</p>

          <div className="flex flex-col gap-2">
            <Link className="text-sm lg:text-base" href="/">
              صفحه اصلی
            </Link>
            <Link className="text-sm lg:text-base" href="/about-us">
              درباره ما
            </Link>
            <Link className="text-sm lg:text-base" href="/contact-us">
              تماس با ما
            </Link>
            <Link className="text-sm lg:text-base" href="/privacy-and-policies">
              حریم خصوصی
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8 lg:items-center">
          <p className="font-bold text-sm lg:text-base">شبکه‌های اجتماعی:</p>

          <div className="flex justify-start items-center gap-4">
            <Link
              target="_blank"
              aria-label="github"
              rel="noopener noreferrer"
              href="https://github.com/nima-ca/cart-khane"
            >
              <GithubIcon className="w-6 h-6" />
            </Link>

            <Link
              target="_blank"
              aria-label="twitter - x"
              rel="noopener noreferrer"
              href="https://x.com/nima_ca_"
            >
              <XIcon className="w-6 h-6 fill-white" />
            </Link>

            <Link
              target="_blank"
              aria-label="linkedin"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/nima-nekouei-nia/"
            >
              <LinkedinIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3 border-t border-white flex items-center justify-center pt-4 mt-5">
          © {new Date().getFullYear()} کارت‌خانه | تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};

export default PrimaryFooter;
