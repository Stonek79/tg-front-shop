import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {Header} from "@/components/Header/Header";
import styles from "@/app/page.module.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Size Plus",
  description: "Size Plus test shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main>
          <Script
              async
              src="https://telegram.org/js/telegram-web-app.js"
              strategy="beforeInteractive"
          />
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          width: '100%'
      }}>
          <Header/>
          <div style={{ flex: 1 }}>{children}</div>
      </div>
      </main>
      </body>
    </html>
  );
}
