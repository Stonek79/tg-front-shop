'use client'
import { Button } from '@/shared/ui/Button'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useCartStore } from '@/entities/Cart'
import { Suspense, useEffect, useState } from 'react'
import { Product } from '@/types/product'

export const AddToCartButton = ({ product }: { product: Product }) => {
    const { t } = getTranslation('products.productItem')
    const isInCart = useCartStore.use.isInCart()
    const addProductToCart = useCartStore.use.addProductToCart()
    const removeProductFromCart = useCartStore.use.removeProductFromCart()
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        useCartStore.persist.rehydrate()
        const hasHydrated = useCartStore.persist.hasHydrated()
        hasHydrated && setInCart(isInCart(product))
    }, [])

    const onAddHandler = () => {
        addProductToCart(product)
        setInCart(true)
    }

    const onRemoveHandler = () => {
        removeProductFromCart(product)
        setInCart(false)
    }

    return (
        <div>
            <Suspense fallback={<h4>LOADING...</h4>}>
                {inCart ? (
                    <Button className="cartBtn alert" onClick={onRemoveHandler}>
                        {t('removeFromCartBtn')}
                    </Button>
                ) : (
                    <Button className="cartBtn" onClick={onAddHandler}>
                        {t('addToCartBtn')}
                    </Button>
                )}
            </Suspense>
        </div>
    )
}
