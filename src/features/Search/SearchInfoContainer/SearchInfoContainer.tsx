'use client'

import cls from './SearchInfoContainer.module.css'
import React, { useEffect } from 'react'
import { ProductPreview } from '@/features/ProductItem'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useInView } from 'react-intersection-observer'
import { useGetProducts } from '@/shared/lib/hooks/useGetProducts'

export const SearchInfoContainer = ({ query = '' }: { query?: string }) => {
    const { t } = getTranslation()

    const { ref, inView } = useInView({
        trackVisibility: true,
        delay: 100,
    })

    const { products, setSize, isLoading, total } = useGetProducts(
        { products: [], total: 10 },
        4,
        { title: query, description: query },
    )

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

    if (!query) {
        return null
    }

    return (
        <div className={cls.searchInfoContainer}>
            <div className={cls.searchWrapper}>
                <ul className={cls.searchList}>
                    {products.length > 0 ? (
                        products?.map((item) => (
                            <ProductPreview
                                key={item.id}
                                product={item}
                                className={cls.searchItem}
                            />
                        ))
                    ) : (
                        <div className={cls.nothingFound}>
                            <h3>{t('search.nothingFound')}</h3>
                            <h4>{t('search.changeRequest')}</h4>
                        </div>
                    )}
                </ul>
                {products.length < total && (
                    <div className={cls.trigger} ref={ref}>
                        {isLoading && <p>Loading more...</p>}
                    </div>
                )}
            </div>
        </div>
    )
}
