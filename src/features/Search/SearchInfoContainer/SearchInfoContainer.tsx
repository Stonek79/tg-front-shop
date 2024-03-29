'use client'

import './SearchInfoContainer.css'
import React, { useEffect, useState } from 'react'
import { ProductPreview } from '@/features/ProductItem'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'
import { productsUrl } from '@/shared/lib/consts/products'
import { fetcher } from '@/shared/lib/api/fetcher'
import { Product } from '@/types/product'

const limit = 10

export const SearchInfoContainer = ({ query = '' }: { query?: string }) => {
    const { t } = getTranslation()

    const [products, setProducts] = useState<Product[]>([])
    const [canTrigger, setCanTrigger] = useState(true)
    const { ref, inView, entry } = useInView({
        trackVisibility: true,
        delay: 100,
        fallbackInView: true,
    })

    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) =>
            `${productsUrl}/search?q=${query}&limit=${limit}&skip=${index * limit}`,
        fetcher,
        {
            parallel: true,
            revalidateOnFocus: false,
            revalidateAll: false,
            revalidateOnMount: false,
        },
    )

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

    // TODO Add skeleton loader
    if (isLoading) {
        return <h3>Loading...</h3>
    }

    if (!query) {
        return null
    }

    return (
        <div className="search-info-container">
            <div className="search-wrapper">
                <ul className="search-list">
                    {products.length > 0 ? (
                        products?.map((item) => (
                            <ProductPreview
                                key={item.id}
                                product={item}
                                className="search-item"
                            />
                        ))
                    ) : (
                        <div className="nothing-found">
                            <h3>{t('search.nothingFound')}</h3>
                            <h4>{t('search.changeRequest')}</h4>
                        </div>
                    )}
                </ul>
                {canTrigger && (
                    <div className="search-trigger" ref={ref}>
                        {entry?.isIntersecting}
                    </div>
                )}
            </div>
        </div>
    )
}
