'use client'

import './ProductsList.css'
import React, { memo, useEffect, useState } from 'react'
import { ProductPreview } from '@/features/ProductItem'
import { Product } from '@/types/product'
import { productsUrl } from '@/shared/lib/consts/products'
import { useInView } from 'react-intersection-observer'
import { fetcher } from '@/shared/lib/api/fetcher'
import useSWRInfinite from 'swr/infinite'
import { useRouter } from 'next/navigation'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'

interface ProductsListProps {
    products: Product[]
    search?: string | undefined
    limit?: number
}

// eslint-disable-next-line react/display-name
export const ProductsList = memo((props: ProductsListProps) => {
    const { t } = getTranslation('products.productsList')
    const { products: initialProducts, search = '', limit = 10 } = props
    const tg = useWebApp()
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
        if (tg?.platform !== 'unknown') {
            tg.onEvent('mainButtonClicked', () => router.push('/cart'))
            return () => {
                tg.offEvent('mainButtonClicked', () => router.push('/cart'))
            }
        }
    }, [tg])

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
        <div className={'wrapper'}>
            <ul className={'list'}>
                {products.map((item) => (
                    <ProductPreview
                        key={item.id}
                        product={item}
                        className={'item'}
                    />
                ))}
            </ul>
            {canTrigger && <div className={'trigger'} ref={ref} />}
        </div>
    )
})
