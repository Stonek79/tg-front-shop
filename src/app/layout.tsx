import { Inter } from 'next/font/google'
import './globals.css'
import './swiper.css'
import cls from './MainPage.module.css'
import { ReactNode } from 'react'
import { Header } from '@/widgets/Header'
import Script from 'next/script'
import { Footer } from '@/widgets/Footer'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { TgAppProvider } from '@/shared/lib/providers'
import { classNames } from '@/shared/lib/helpers/classNames'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
    const { t } = getTranslation()

    return {
        title: t('meta.rootLayout.metaTitle') as string,
        description: t('meta.rootLayout.metaDescription') as string,
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const cn = classNames('light_theme', {}, [inter.className])
    return (
        <html lang="en">
            <body className={cn}>
                <main id={'root-layout'} className={cls.mainLayout}>
                    <Script
                        async
                        src="https://telegram.org/js/telegram-web-app.js"
                        strategy="beforeInteractive"
                    />
                    {children}
                </main>
            </body>
        </html>
    )
}
