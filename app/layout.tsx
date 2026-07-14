import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "黄伊阳 - 兴趣电商运营作品集",
  description:
    "黄伊阳的个人作品集，展示兴趣电商运营、品牌自播、短视频内容、达人种草、投放优化与团队管理项目。",
  openGraph: {
    title: "黄伊阳 - 兴趣电商运营作品集",
    description:
      "展示兴趣电商运营、品牌自播、短视频内容、达人种草、投放优化与团队管理项目。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "黄伊阳兴趣电商运营作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "黄伊阳 - 兴趣电商运营作品集",
    description:
      "展示兴趣电商运营、品牌自播、短视频内容、达人种草、投放优化与团队管理项目。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
