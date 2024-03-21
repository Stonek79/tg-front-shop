'use client'
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app'
import { ReactNode } from 'react'

export const TgAppProvider = ({ children }: { children: ReactNode }) => (
    <WebAppProvider
        options={{
            smoothButtonsTransition: true,
        }}
    >
        {children}
    </WebAppProvider>
)
