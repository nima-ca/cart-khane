import { FC } from "react";

const AboutUsPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl bg-white rounded-lg p-6 md:p-10">
        <h1 className="text-lg lg:text-3xl font-bold text-regal-blue-500 mb-4 text-center">
          درباره کارت خانه
        </h1>
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
          <strong>کارت خانه</strong> اپلیکیشنی است که به منظور ساده‌تر کردن
          زندگی روزمره طراحی شده است. هدف ما ایجاد بستری امن، راحت و کاربرپسند
          است که مدیریت وظایف، سازماندهی اطلاعات، و دسترسی به اطلاعات کارت های
          بانکی خود را برای شما تسهیل می‌کند.
        </p>
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
          ما در کارت خانه باور داریم که امنیت و حریم خصوصی کاربران باید همیشه در
          اولویت قرار گیرد. به همین دلیل، تمام تلاش خود را برای فراهم کردن محیطی
          امن و محافظت‌شده برای اطلاعات شما می‌کنیم.
        </p>

        <h2 className="text-lg lg:text-2xl font-semibold text-gray-700 mt-6 mb-2">
          ارزش‌های ما
        </h2>
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mt-6">
          ما متعهد هستیم که امنیت و حریم خصوصی شما در اولویت قرار گیرد. با
          استفاده از پروتکل‌های امنیتی پیشرفته رمزنگاری اطلاعات شما را از هر
          گونه تهدیدی محافظت می‌کنیم. علاوه بر این، داده های شما در اختیار هیچ
          شخص، سازمان و یا نهادی قرار داده نمی شود و هیچگونه استفاده تجاری و غیر
          تجاری از آنها نخواهد شد.
        </p>
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mt-6">
          اگر به دنبال یک راه‌حل هوشمند، امن و کاربرپسند برای مدیریت زندگی خود
          هستید، کارت خانه بهترین انتخاب شماست. امنیت شما برای ما حرف اول را
          می‌زند، بنابراین شما می‌توانید با خیال راحت از خدمات ما استفاده کنید.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
