'use client'

import cls from './ProductsList.module.css'
import React, { memo, Suspense, useEffect } from 'react'
import { ProductPreview } from '@/features/ProductItem'
import { Product } from '@/types/product'
import { useInView } from 'react-intersection-observer'
import { useCurrentScrollPosition } from '@/shared/lib/hooks/useCurrentScrollPosition'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { useGetProducts } from '@/shared/lib/hooks/useGetProducts'

const scrollPositionName = 'productsListScrollPosition'

const isDaysPassed = (dateString = '', days = 15) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const passedDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    return passedDays >= days
}

interface ProductsListProps {
    products: Product[]
    limit?: number
    sort?: { field: string; order: string }
    filter?: Record<string, string>
    total: number
}

// eslint-disable-next-line react/display-name
export const ProductsList = memo((props: ProductsListProps) => {
    const {
        products: initialProducts,
        sort,
        filter = {},
        limit = 10,
        total: totalProducts,
    } = props

    const { products, setSize, isLoading, total } = useGetProducts(
        { products: initialProducts, total: totalProducts },
        limit,
        filter,
        sort,
    )

    const { ref, inView } = useInView({
        trackVisibility: true,
        delay: 100,
    })

    useCurrentScrollPosition(scrollPositionName)

    useEffect(() => {
        const scrollPosition = localStorage.getItem(scrollPositionName)
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition))
        }
    }, [])

    useEffect(() => {
        if (!isLoading && inView && products.length < total) {
            const timeout = setTimeout(async () => {
                await setSize((prevSize) => prevSize + 1)
            }, 200)

            return () => clearTimeout(timeout)
        }
    }, [inView, products.length, total, setSize, isLoading])

    // TODO: add good loader
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className={cls.wrapper}>
            <Breadcrumbs />
            <Suspense fallback={<div>Loading...</div>}>
                <ul className={cls.list}>
                    {products?.map((item) => {
                        const isNew = isDaysPassed(item?.createdAt, 10)
                        const isSale = !!item?.onSale
                        const isHit =
                            !isNew && item?.rating && item.rating >= 4.5
                        return (
                            <ProductPreview
                                key={item.id}
                                product={item}
                                className={cls.item}
                                isNew={isNew}
                                isHit={!!isHit}
                                isSale={isSale}
                            />
                        )
                    })}
                </ul>
                {products.length < total && (
                    <div className={cls.trigger} ref={ref}>
                        {isLoading && <p>Loading more...</p>}
                    </div>
                )}
            </Suspense>
        </div>
    )
})
