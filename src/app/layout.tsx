import PrimaryLayout from "@src/components/layouts/primary/primary";
import Providers from "@src/components/layouts/providers/providers";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "کارت‌خانه | مدیریت امن اطلاعات کارت‌های اعتباری",
  description:
    "کارت‌خانه اپلیکیشنی برای ذخیره و مدیریت امن اطلاعات کارت‌های اعتباری شما. با طراحی ساده و امنیت بالا، اطلاعات مالی خود را همیشه در دسترس داشته باشید.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} antialiased bg-regal-blue-50 font-vazirmatn`}
      >
        <Providers>
          <PrimaryLayout>{children}</PrimaryLayout>
        </Providers>
      </body>
    </html>
  );
}
