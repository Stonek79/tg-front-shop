'use client'

import styles from './ProductsList.module.css'
import React, { Suspense, useEffect, useState } from 'react'
import { useTgApp } from '@/shared/lib/hooks/useTgApp'
import { ProductPreview } from '@/features/ProductItem/ProductPreview'
import { Product } from '@/types/product'
import { productsUrl } from '@/shared/lib/consts/products'
import { useInView } from 'react-intersection-observer'
import { fetcher } from '@/shared/lib/api/fetcher'
import useSWRInfinite from 'swr/infinite'
import ErrorBoundary from '@/widgets/ErrorBoundary/ErrorBoundary'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button/Button'

interface ProductsListProps {
    products: Product[]
    search?: string | undefined
    limit?: number
}

export const ProductsList = (props: ProductsListProps) => {
    const { products: initialProducts, search = '', limit = 10 } = props
    const { tg, loaded, isTgPlatform } = useTgApp()
    const router = useRouter()

    const [products, setProducts] = useState(initialProducts)
    const [canTrigger, setCanTrigger] = useState(true)
    const [ref, inView] = useInView()

    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) =>
            `${productsUrl}?search=${search}&limit=${limit}&skip=${
                index * limit
            }`,
        fetcher,
        {
            parallel: true,
            revalidateOnFocus: false,
            revalidateAll: false,
            revalidateOnMount: false,
        },
    )

    useEffect(() => {
        if (loaded && isTgPlatform) {
            tg.onEvent('mainButtonClicked', () => router.push('/cart'))
            return () => {
                tg.offEvent('mainButtonClicked', () => router.push('/cart'))
            }
        }
    }, [loaded, isTgPlatform])

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

    return (
        <div className={styles.wrapper}>
            <Button onClick={() => router.push('/cart')}>Корзина</Button>
            <div className={styles.list}>
                <ErrorBoundary>
                    <Suspense fallback={<h1>Загрузка...</h1>}>
                        {products.map((item) => (
                            <ProductPreview
                                key={item.id}
                                product={item}
                                className={styles.item}
                            />
                        ))}
                    </Suspense>
                </ErrorBoundary>
            </div>
            {canTrigger && <div className={styles.trigger} ref={ref} />}
        </div>
    )
}
