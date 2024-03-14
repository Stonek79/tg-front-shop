import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './swiper.css'
import './MainPage.css'
import { ReactNode } from 'react'
import { Header } from '@/widgets/Header'
import Script from 'next/script'
import { Footer } from '@/widgets/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Size Plus',
    description: 'Size Plus - магазин модной одежды для больших людей',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className + ' light_theme'}>
                <main className="main_layout">
                    <Script
                        async
                        src="https://telegram.org/js/telegram-web-app.js"
                        strategy="beforeInteractive"
                    />
                    <Header />
                    <div className="main_layout_container">{children}</div>
                    <Footer />
                </main>
            </body>
        </html>
    )
}
