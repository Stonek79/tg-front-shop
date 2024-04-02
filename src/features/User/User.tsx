'use client'

import cls from './User.module.css'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'

export const User = () => {
    const tg = useWebApp()

    if (!tg?.initDataUnsafe?.user) {
        return <h3>No user data</h3>
    }

    const {
        username = '',
        first_name = '',
        last_name = '',
        language_code = '',
        is_bot = false,
        is_premium = false,
    } = tg?.initDataUnsafe?.user

    return (
        <div className={cls.user}>
            <div>Username: {username}</div>
            <div>First name: {first_name}</div>
            <div>Last name: {last_name}</div>
            <div>Language code: {language_code}</div>
            <div>Is bot: {is_bot}</div>
            <div>Is premium: {is_premium}</div>
        </div>
    )
}
