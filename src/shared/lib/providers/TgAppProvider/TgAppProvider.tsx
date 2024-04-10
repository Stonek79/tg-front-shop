'use client'
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export const TgAppProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    if (pathname === '/admin') {
        return <>{children}</>
    }

    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            {children}
        </WebAppProvider>
    )
}
