import type { Metadata } from "next";
import localFont from 'next/font/local'
import Header from "@/component/header";
import "./globals.css";
 
const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "김쌈무 개발 블로그",
  description: "새로운 기술을 실험하고, 더 나은 방법을 찾아가기 위한 기록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`${pretendard.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
