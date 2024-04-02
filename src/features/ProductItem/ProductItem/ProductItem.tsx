'use client'

import cls from './ProductItem.module.css'
import { Product } from '@/types/product'
import { memo } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { ProductImageBlock } from '@/entities/Product'
import { AddFavoriteButton } from '../AddFavoriteButton/AddFavoriteButton'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { BackButton } from '../BackButton/BackButton'
import { classNames } from '@/shared/lib/helpers/classNames'

interface ProductItemProps {
    product: Product
    className?: string
}

// eslint-disable-next-line react/display-name
export const ProductItem = memo(({ product, className }: ProductItemProps) => {
    const { t } = getTranslation()

    const cn = classNames(cls.productItem, {}, [className])
    return (
        <div className={cn}>
            <BackButton />
            <div className={cls.productWrapper}>
                <div className={cls.imageWrapper}>
                    {product.images && ProductImageBlock(product.images)}
                </div>
                <div className={cls.productDescription}>
                    <div className={cls.productButtonBlock}>
                        <AddToCartButton product={product} />
                        <AddFavoriteButton product={product} />
                    </div>
                    <div className={cls.productDescription}>
                        <div className={cls.title}>
                            <span>{t('products.title')}:</span> {product.title}
                        </div>
                        <div className={cls.description}>
                            <span>{t('products.description')}:</span>{' '}
                            {product.description}
                        </div>
                        <div className={cls.price}>
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
