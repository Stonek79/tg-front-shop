'use client'
import { useCallback, useEffect } from 'react'
import { Product } from '@/types/product'
import { useTgApp } from '@/shared/lib/hooks/useTgApp'
import { getTotalPrice } from '@/shared/lib/helpers/getTotalPrice'
import { signal } from '@preact/signals'

export const useAddProductToCart = () => {
    const { tg, loaded, isTgPlatform } = useTgApp()
    const productsInCart = signal<Product[]>([])

    const onAdd = useCallback(
        (product: Product) => {
            const cart = localStorage.getItem('cart')
            if (cart && loaded) {
                const addedProducts: Product[] = JSON.parse(cart)
                const alreadyAdded = addedProducts.find(
                    (item) => item.id === product.id,
                )

                if (alreadyAdded) {
                    return null
                }

                const newProducts: Product[] = [...addedProducts, product]
                localStorage.setItem('cart', JSON.stringify(newProducts))

                productsInCart.value = newProducts
            }
            if (!cart && loaded) {
                localStorage.setItem('cart', JSON.stringify([product]))
                productsInCart.value = [product]

                if (isTgPlatform) {
                    tg.MainButton.show()
                    tg.MainButton.setParams({
                        text: `Купить 1 товар на сумму ${getTotalPrice([product])}`,
                    })
                }
            }
        },
        [loaded, isTgPlatform],
    )

    useEffect(() => {
        if (!loaded || !isTgPlatform) {
            return
        }
        const goods =
            productsInCart.value.length === 1
                ? 'товар'
                : productsInCart.value.length > 4
                  ? 'товаров'
                  : 'товара'

        if (productsInCart.value.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить ${productsInCart.value.length} ${goods} на сумму ${getTotalPrice(productsInCart.value)}`,
            })
        }
    }, [productsInCart.value, loaded, isTgPlatform])

    const clearCart = () => {
        localStorage.removeItem('cart')
        productsInCart.value = []

        console.log('Корзина очищена')
    }

    return {
        productsInCart,
        onAdd,
        clearCart,
    }
}
