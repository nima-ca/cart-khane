import landingImg from "@images/landing-img.png";
import Button from "@src/components/ui/button/button";
import { Handshake, ShieldCheck, Wifi } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center xl:flex-row flex-col-reverse px-4">
      <div className="flex flex-col gap-2 max-w-[40rem]">
        <h1 className="text-xl xl:text-3xl font-bold text-right text-regal-blue-500">
          مدیریت امن اطلاعات کارت‌های اعتباری شما
        </h1>
        <h2 className="font-medium text-right text-regal-blue-800 text-base xl:text-lg">
          کارت‌خانه اپلیکیشنی برای ذخیره و مدیریت امن اطلاعات کارت‌های اعتباری
          شما. با طراحی ساده و امنیت بالا، اطلاعات مالی خود را همیشه در دسترس
          داشته باشید.
        </h2>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-regal-blue-100 rounded-xl w-10 h-10">
              <ShieldCheck className="text-regal-blue-700" />
            </div>
            <p className="text-sm xl:text-base text-gray-700 font-medium">
              اطلاعات شما با جدیدترین فناوری‌های رمزنگاری محافظت می‌شود
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-regal-blue-100 rounded-xl w-10 h-10">
              <Wifi className="text-regal-blue-700" />
            </div>
            <p className="text-sm xl:text-base text-gray-700 font-medium">
              کارت‌های خود را همیشه و همه‌جا به راحتی مدیریت کنید.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-regal-blue-100 rounded-xl w-10 h-10">
              <Handshake className="text-regal-blue-700" />
            </div>
            <p className="text-sm xl:text-base text-gray-700 font-medium">
              با طراحی کاربرپسند، استفاده از اپلیکیشن لذت‌بخش خواهد بود.
            </p>
          </div>
        </div>

        <Button className="mt-2" href="/auth/login">
          ورود به اپلیکیشن
        </Button>
      </div>

      <div>
        <Image
          src={landingImg}
          alt="مدیریت امن اطلاعات کارت های اعتباری"
          className="max-w-[20rem] xl:max-w-[40rem]"
          quality={100}
        />
      </div>
    </div>
  );
}
