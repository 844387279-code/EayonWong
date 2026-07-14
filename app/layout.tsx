import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "黄伊阳 - 兴趣电商与AI运营作品集",
  description:
    "黄伊阳的兴趣电商与AI运营作品集，展示抖音、视频号、快手电商经验、项目经历、AI工具能力与联系方式。",
  openGraph: {
    title: "黄伊阳 - 兴趣电商与AI运营作品集",
    description:
      "展示黄伊阳在兴趣电商、AI辅助运营、品牌增长、项目操盘和团队管理方面的代表经历。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "黄伊阳兴趣电商与AI运营作品集预览",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "黄伊阳 - 兴趣电商与AI运营作品集",
    description:
      "展示黄伊阳在兴趣电商、AI辅助运营、品牌增长、项目操盘和团队管理方面的代表经历。",
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
