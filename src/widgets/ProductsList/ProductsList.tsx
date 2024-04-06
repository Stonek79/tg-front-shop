'use client'

import cls from './ProductsList.module.css'
import React, { memo, Suspense, useEffect, useState } from 'react'
import { ProductPreview } from '@/features/ProductItem'
import { Product } from '@/types/product'
import { productsUrl } from '@/shared/consts/products'
import { useInView } from 'react-intersection-observer'
import { fetcher } from '@/shared/lib/api/fetcher'
import useSWRInfinite from 'swr/infinite'
import { useRouter } from 'next/navigation'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useCurrentScrollPosition } from '@/shared/lib/hooks/useCurrentScrollPosition'

const scrollPositionName = 'productsListScrollPosition'

interface ProductsListProps {
    products?: Product[]
    search?: string | undefined
    limit?: number
}

// eslint-disable-next-line react/display-name
export const ProductsList = memo((props: ProductsListProps) => {
    const { products: initialProducts, search = '', limit = 10 } = props
    const tg = useWebApp()
    const router = useRouter()
    const [products, setProducts] = useState(initialProducts)
    const [canTrigger, setCanTrigger] = useState(true)
    const [ref, inView, entry] = useInView({
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

    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) =>
            `${productsUrl}?q=${search}&limit=${limit}&skip=${index * limit}`,
        fetcher,
        {
            parallel: true,
            revalidateOnFocus: false,
            revalidateAll: false,
            revalidateOnMount: false,
        },
    )

    useEffect(() => {
        if (tg?.platform !== 'unknown') {
            tg.onEvent('mainButtonClicked', () => router.push('/cart'))
            return () => {
                tg.offEvent('mainButtonClicked', () => router.push('/cart'))
            }
        }
    }, [])

    useEffect(() => {
        if (!isLoading && data) {
            const newProducts = data.flatMap(
                ({ products }: { products: Product[] }) => products,
            )
            if (data[0].total === newProducts.length) {
                setCanTrigger(false)
            }
            setProducts(newProducts)
        }
    }, [data, isLoading])

    useEffect(() => {
        if (inView) {
            setSize(size + 1)
        }
    }, [inView])

    type Labels = 'new' | 'sale' | 'bestseller'

    return (
        <div className={cls.wrapper}>
            <Suspense fallback={<div>Loading...</div>}>
                <ul className={cls.list}>
                    {products?.map((item) => {
                        return <ProductPreview
                            key={ item.id }
                            product={ item }
                            className={ cls.item }
                        />
                    })}
                </ul>
                {canTrigger && (
                    <div className={cls.trigger} ref={ref}>
                        {entry?.isIntersecting}
                    </div>
                )}
            </Suspense>
        </div>
    )
})
