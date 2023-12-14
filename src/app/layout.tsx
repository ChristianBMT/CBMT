import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P6QBQ1CM16"
        ></script>
        <script src="google.js"></script>
        <link rel="icon" href="vercel.svg" />
        <title>ChristBMT</title>
        <meta name="description" content="Christian Basic Military Training" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
