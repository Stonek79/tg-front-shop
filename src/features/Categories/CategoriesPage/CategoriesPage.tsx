import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import cls from './CategoriesPage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { categoriesList } from '@/shared/consts/categories'

export const CategoriesPage = () => {
    const { t } = getTranslation()
    const categories = categoriesList
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
