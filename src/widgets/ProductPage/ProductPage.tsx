'use client'

import { Product } from '@/types/product'
import { memo } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { classNames } from '@/shared/lib/helpers/classNames'
import cls from './ProductPage.module.css'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import {
    AddFavoriteButton,
    AddToCartButton,
    ProductDescription,
    RatingBlock,
} from '@/features/ProductItem'
import { ProductImageBlock } from '@/entities/Product'

interface ProductItemProps {
    product: Product
    className?: string
}

// eslint-disable-next-line react/display-name
export const ProductPage = memo(({ product, className }: ProductItemProps) => {
    const { t } = getTranslation()

    const cn = classNames(cls.productItem, {}, [className])
    return (
        <div className={cn}>
            <Breadcrumbs />
            <div className={cls.productWrapper}>
                <section className={cls.imageContainer}>
                    <div className={cls.imageWrapper}>
                        {product.images && ProductImageBlock(product.images)}
                    </div>
                </section>
                <section className={cls.productInfo}>
                    <div className={cls.productDescription}>
                        <ProductDescription product={product} />
                        <RatingBlock rating={product.rating} />
                    </div>
                    <div className={cls.productCartBlock}>
                        <AddToCartButton product={product} />
                        <AddFavoriteButton product={product} />
                    </div>
                </section>
                <section />
            </div>
        </div>
    )
})
