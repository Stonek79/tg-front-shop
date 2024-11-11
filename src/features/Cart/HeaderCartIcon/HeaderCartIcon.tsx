'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { getTotalPrice } from '@/shared/lib/helpers/getTotalPrice'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useCartStore } from '@/shared/state/cart'
import Image from 'next/image'

export const HeaderCartIcon = () => {
    const productsInCart = useCartStore.use.cart()
    const amount = productsInCart.length
    const tg = useWebApp()

    useEffect(() => {
        if (!tg) {
            return
        }
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
        <div className="iconBtnCF">
            <Link
                className="iconLinkCF"
                href={'/cart'}
                aria-label={'headerCartIcon'}
            >
                <Image
                    src={'/img/cart.svg'}
                    alt={'Корзина'}
                    className="iconCF"
                    width={24}
                    height={24}
                />
                {Boolean(amount) && (
                    <span className="notEmptyCF">{amount}</span>
                )}
            </Link>
        </div>
    )
}
