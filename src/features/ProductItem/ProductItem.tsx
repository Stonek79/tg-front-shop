'use client'

import './ProductItem.css'
import { Product } from '@/types/product'
import { memo } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { ProductImageBlock } from '@/entities/Product'
import { AddFavoriteButton } from './AddFavoriteButton/AddFavoriteButton'
import { AddToCartButton } from './AddToCartButton/AddToCartButton'
import { BackButton } from './BackButton/BackButton'

interface ProductItemProps {
    product: Product
    className?: string
}

// eslint-disable-next-line react/display-name
export const ProductItem = memo(({ product, className }: ProductItemProps) => {
    const { t } = getTranslation()

    return (
        <div className={`productItem ${className}`}>
            <BackButton />
            <div className="productWrapper">
                <div className="imageWrapper">
                    {product.images && ProductImageBlock(product.images)}
                </div>
                <div className="productDescription">
                    <div className="productButtonBlock">
                        <AddToCartButton product={product} />
                        <AddFavoriteButton product={product} />
                    </div>
                    <div className="productDescription">
                        <div className="title">
                            <span>{t('products.title')}:</span> {product.title}
                        </div>
                        <div className="description">
                            <span>{t('products.description')}:</span>{' '}
                            {product.description}
                        </div>
                        <div className="price">
                            <span>
                                {t('products.price')}: <b>{product.price}</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
