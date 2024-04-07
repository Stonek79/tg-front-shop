import cls from './CategoriesContentLayout.module.css'
import { Product } from '@/types/product'
import React, { Suspense } from 'react'
import { ProductPreview } from '@/features/ProductItem'

interface CategoriesContentLayoutProps {
    products: Product[]
    className?: string
    isNew?: boolean
    isHit?: boolean
    isSale?: boolean
}

export const CategoriesContentLayout = ({
    products,
    isHit = false,
    isSale = false,
    isNew = false,
}: CategoriesContentLayoutProps) => (
    <section className={cls.categoriesContentLayout}>
        <Suspense fallback={<div>Loading...</div>}>
            <ul className={cls.list}>
                {products.map((product) => (
                    <ProductPreview
                        key={product.id}
                        product={product}
                        className={cls.item}
                        isNew={isNew}
                        isHit={isHit}
                        isSale={isSale}
                    />
                ))}
            </ul>
        </Suspense>
    </section>
)
