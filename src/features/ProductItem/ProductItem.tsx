'use client'

import './ProductItem.css'
import { Product } from '@/types/product'
import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'
import { memo, useState } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useFavoritesStore } from '@/entities/FavoritesProducts'
import { useCartStore } from '@/entities/Cart'
import { ProductImageBlock } from '@/entities/Product'

interface ProductItemProps {
    product: Product
    className?: string
}

// eslint-disable-next-line react/display-name
export const ProductItem = memo(({ product, className }: ProductItemProps) => {
    const router = useRouter()
    const { t } = getTranslation('products.productItem')
    const addFavorites = useFavoritesStore.use.addFavorites()
    const isInCart = useCartStore.use.isInCart()
    const addProductToCart = useCartStore.use.addProductToCart()
    const removeProductFromCart = useCartStore.use.removeProductFromCart()
    const [inCart, setInCart] = useState(isInCart(product))

    const handleAddFavorites = () => {
        addFavorites(product)
    }

    const onAddHandler = () => {
        addProductToCart(product)
        setInCart(true)
    }

    const onRemoveHandler = () => {
        removeProductFromCart(product)
        setInCart(false)
    }

    return (
        <div className={`productItem ${className}`}>
            <div className="productWrapper">
                <div className="imageWrapper">
                    {product.images && ProductImageBlock(product.images)}
                </div>
                <div className="productDescription">
                    <div className="productButtonBlock">
                        <Button onClick={() => router.back()}>
                            {t('backBtn')}
                        </Button>
                        {inCart ? (
                            <Button
                                className="cartBtn alert"
                                onClick={onRemoveHandler}
                            >
                                {t('removeFromCartBtn')}
                            </Button>
                        ) : (
                            <Button className="cartBtn" onClick={onAddHandler}>
                                {t('addToCartBtn')}
                            </Button>
                        )}
                        <Button onClick={handleAddFavorites}>
                            {t('AddToFavorites')}
                        </Button>
                    </div>
                    <div className="productDescription">
                        <div className="title">
                            <span>{t('title')}:</span> {product.title}
                        </div>
                        <div className="description">
                            <span>{t('description')}:</span>{' '}
                            {product.description}
                        </div>
                        <div className="price">
                            <span>
                                {t('price')}: <b>{product.price}</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
