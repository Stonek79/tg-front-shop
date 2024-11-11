import cls from './MenuContent.module.css'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { allCategories, categoriesList } from '@/shared/consts/categories'
import Link from 'next/link'

//TODO fix this component

export const MenuContent = () => {
    const { t } = getTranslation()
    const categories = Object.keys(categoriesList)
    return (
        <div>
            <h2>{t('category.category')}</h2>
            {categories.map((category) => {
                const currentCategory = categoriesList[category]

                return currentCategory?.subcategories ? (
                    <details className={cls.details} key={category}>
                        <summary className={cls.summary}>
                            <h3>{t(`category.${category}`)}</h3>
                        </summary>
                        {currentCategory?.subcategories &&
                            currentCategory?.subcategories.map(
                                (subcategory) => {
                                    const currentSubcategory =
                                        allCategories[subcategory]
                                    return (
                                        <Link
                                            className={cls.categoryLink}
                                            key={currentSubcategory.name}
                                            href={`category/${currentSubcategory.url}`}
                                        >
                                            <h4 className={cls.subCategoryLink}>
                                                {t(`category.${subcategory}`)}
                                            </h4>
                                        </Link>
                                    )
                                },
                            )}
                    </details>
                ) : (
                    <Link href={`category/${currentCategory.url}`}>
                        <h3 className={cls.categoryLink}>
                            {t(`category.${category}`)}
                        </h3>
                    </Link>
                )
            })}
        </div>
    )
}
