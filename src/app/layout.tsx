import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './swiper.css';
import styles from "./container.module.css";
import {ReactNode} from "react";
import {Header} from "@/components/Header/Header";
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
          <main className={styles.mainLayout}>
              <Script
                  async
                  src="https://telegram.org/js/telegram-web-app.js"
                  strategy="beforeInteractive"
              />
              <Header/>
              <div className={styles.container}>{children}</div>
          </main>
      </body>
    </html>
  );
}
