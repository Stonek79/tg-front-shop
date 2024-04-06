'use client'

import { memo } from 'react'
import Link from 'next/link'
import cls from './CategoriesSlider.module.css'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { categoriesList } from '@/shared/consts/categories'

// eslint-disable-next-line react/display-name
export const CategoriesSlider = memo(() => {
    const { t } = getTranslation()
    const categories = categoriesList
    const categoryNames = Object.keys(categories)

    return (
        <div className={cls.container}>
            <div className={cls.horizontalScrollingItems}>
                {categoryNames.map((category, index) => (
                    <Link
                        href={`/products/category/${categories[category].url}`}
                        key={index}
                    >
                        <figure className={cls.horizontalScrollingItem}>
                            <Image
                                className={cls.horizontalScrollingImage}
                                src={`/img/categories/${categories[category].icon}`}
                                alt={categories[category].name}
                                width={200}
                                height={200}
                            />
                            <figcaption className={cls.figcaption}>
                                {t(`category.${category}`)}
                            </figcaption>
                        </figure>
                    </Link>
                ))}
            </div>
            <div className={cls.horizontalScrollingItems}>
                {categoryNames.map((category, index) => (
                    <Link
                        href={`/products/category/${categories[category].url}`}
                        key={index}
                    >
                        <figure className={cls.horizontalScrollingItem}>
                            <Image
                                className={cls.horizontalScrollingImage}
                                src={`/img/categories/${categories[category].icon}`}
                                alt={categories[category].name}
                                width={200}
                                height={200}
                            />
                            <figcaption className={cls.figcaption}>
                                {t(`category.${category}`)}
                            </figcaption>
                        </figure>
                    </Link>
                ))}
            </div>
        </div>
    )
})
