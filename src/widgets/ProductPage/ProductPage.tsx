'use client'

import { Product } from '@/types/product'
import { memo } from 'react'
import { classNames } from '@/shared/lib/helpers/classNames'
import cls from './ProductPage.module.css'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import {
    AddFavoriteButton,
    AddToCartButton,
    ProductDescription,
    RatingBlock,
} from '@/features/ProductItem'
import { EmblaOptionsType } from 'embla-carousel'
import { CarouselComponent } from '@/features/Carousel'

const OPTIONS: EmblaOptionsType = { loop: true }

// eslint-disable-next-line react/display-name
export const ProductPage = memo(({ product }: { product: Product }) => {
    const cn = classNames(cls.productItem, {}, [])
    if (!product) return null

    return (
        <div className={cn}>
            <Breadcrumbs lastItemLabel={product.title} />
            <div className={cls.productWrapper}>
                <section className={cls.imageContainer}>
                    <div>
                        {product?.images && (
                            <CarouselComponent
                                slides={product.images as string[]}
                                options={OPTIONS}
                                direction="left"
                                hasImageDialog
                            />
                        )}
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
