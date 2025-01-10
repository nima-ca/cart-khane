import { Mail } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const AboutUsPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl bg-white rounded-lg p-6 md:p-10 w-full">
        <h1 className="text-lg lg:text-3xl font-bold text-regal-blue-500 mb-4 text-center">
          راه های ارتباطی
        </h1>

        <p className="text-sm lg:text-base">
          برای تماس با ما میتوانید از راه های زیر اقدام کنید:{" "}
        </p>

        <Link
          href="mailto:nekoueinima@gmail.com"
          className="flex items-center gap-2 mt-2 text-sm lg:text-base"
        >
          <Mail />
          nekoueinima@gmail.com
        </Link>

        <p className="mt-2 text-sm lg:text-base">
          همچنین در صورت تمایل به شرکت در توسعه این اپلیکیشن میتوانید از طریق{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/nima-ca/cart-khane"
            className="underline text-regal-blue-500"
          >
            ریپازیتوری
          </Link>{" "}
          این اپلیکیشن اقدام کنید
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
