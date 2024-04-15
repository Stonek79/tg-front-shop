'use client'

import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import cls from './CategoriesPage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

export const CategoriesPage = ({
    categories = {},
}: {
    categories: NamedCategory
}) => {
    const { t } = getTranslation()
    const categoryNames = Object.keys(categories)

    return (
        <section className={cls.container}>
            <ul className={cls.categoriesPageItems}>
                {categoryNames.map((category, index) => (
                    <li key={index} className={cls.categoriesPageItem}>
                        <Link
                            href={`/category/${categories[category].url}`}
                            className={cls.categoriesPageItemLink}
                        >
                            <div className={cls.categoriesPageItemImageWrapper}>
                                <Image
                                    src={`/img/categories/${categories[category].icon}`}
                                    onError={(event) => {
                                        // @ts-ignore
                                        event.target.srcset =
                                            '/img/categories/all.webp'
                                    }}
                                    alt={categories[category].name}
                                    width={200}
                                    height={200}
                                    className={cls.categoriesPageItemImage}
                                    priority
                                />
                            </div>
                            <div>
                                <span className={cls.categoryName}>
                                    {t(`category.${category}`)}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
