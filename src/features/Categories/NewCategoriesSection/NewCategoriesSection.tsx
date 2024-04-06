import cls from './NewCategoriesSection.module.css'
import { Product } from '@/types/product'
import { ProductPreview } from '@/features/ProductItem'
import React, { Suspense } from 'react'

export const NewCategoriesSection = ({ newProducts }: { newProducts: Product[] }) => {
    return (
        <section className={ cls.newCategoriesSection }>
            <Suspense fallback={<div>Loading...</div>}>
                <ul className={cls.list}>
            { newProducts.map((product) => (
                <ProductPreview
                    key={ product.id }
                    product={ product }
                    className={ cls.item }
                    isNew
                />
            )) }
                </ul>
                </Suspense>
        </section>
    )
}
