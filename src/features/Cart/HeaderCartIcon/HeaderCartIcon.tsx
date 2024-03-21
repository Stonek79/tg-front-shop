'use client'
import './HeaderCartIcon.css'
import Link from 'next/link'
import { useCartStore } from '@/entities/Cart'
import { useEffect } from 'react'
import { getTotalPrice } from '@/shared/lib/helpers/getTotalPrice'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'

export const HeaderCartIcon = () => {
    const productsInCart = useCartStore.use.cart()
    const amount = productsInCart.length
    const tg = useWebApp()

    useEffect(() => {
        if (tg?.platform === 'unknown') {
            return
        }

        tg?.ready()
        tg?.expand()

        const goods = amount === 1 ? 'товар' : amount > 4 ? 'товаров' : 'товара'

        if (amount === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить ${amount} ${goods} на сумму ${getTotalPrice(productsInCart)}`,
            })
        }
    }, [productsInCart, tg])

    return (
        <div className="cart_btn">
            <Link
                className="cart_icon"
                href={'/cart'}
                aria-label={'headerCartIcon'}
            >
                {Boolean(amount) && (
                    <span className={'not-empty'}>{amount}</span>
                )}
            </Link>
        </div>
    )
}
