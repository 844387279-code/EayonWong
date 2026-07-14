import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yiyang Huang Portfolio",
  description:
    "A bilingual personal portfolio for video, image, project experience, and resume highlights.",
  openGraph: {
    title: "Yiyang Huang Portfolio",
    description:
      "A bilingual personal portfolio for video, image, project experience, and resume highlights.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yiyang Huang portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yiyang Huang Portfolio",
    description:
      "A bilingual personal portfolio for video, image, project experience, and resume highlights.",
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
