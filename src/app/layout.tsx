import { Inter } from 'next/font/google'
import './globals.css'
import './swiper.css'
import './MainPage.css'
import { ReactNode } from 'react'
import { Header } from '@/widgets/Header'
import Script from 'next/script'
import { Footer } from '@/widgets/Footer'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { TgAppProvider } from '@/shared/lib/providers'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
    const { t } = getTranslation('rootLayout.meta')

    return {
        title: t('metaTitle') as string,
        description: t('metaDescription') as string,
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} light_theme`}>
                <main id={'root-layout'} className="main-layout">
                    <Script
                        async
                        src="https://telegram.org/js/telegram-web-app.js"
                        strategy="beforeInteractive"
                    />
                    <TgAppProvider>
                        <Header />
                        <div className="main-layout-container">{children}</div>
                        <Footer />
                    </TgAppProvider>
                </main>
            </body>
        </html>
    )
}
