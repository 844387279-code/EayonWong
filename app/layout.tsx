import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jack -- 3D Creator",
  description:
    "Jack's 3D creator portfolio showcasing immersive modeling, rendering, motion design, branding, and web projects.",
  openGraph: {
    title: "Jack -- 3D Creator",
    description:
      "A dark, cinematic 3D creator portfolio for modeling, rendering, motion, branding, and web design.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jack 3D Creator portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack -- 3D Creator",
    description:
      "A dark, cinematic 3D creator portfolio for modeling, rendering, motion, branding, and web design.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
