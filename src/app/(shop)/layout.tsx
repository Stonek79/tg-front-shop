import { Header } from '@/widgets/Header'
import cls from '@/app/MainPage.module.css'
import { Footer } from '@/widgets/Footer'
import { TgAppProvider } from '@/shared/lib/providers'
import { ReactNode } from 'react'

export default function ShopLayout({ children }: { children: ReactNode }) {
    return (
        <TgAppProvider>
            <Header />
            <div className={cls.mainLayoutContainer}>{children}</div>
            <Footer />
        </TgAppProvider>
    )
}
