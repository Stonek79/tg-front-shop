import { CategoriesPage } from '@/features/Categories'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import cls from './Category.module.css'
import { categoriesList } from '@/shared/consts/categories'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

export default async function Categories() {
    const { t } = getTranslation()

    return (
        <div>
            <Breadcrumbs startSegment={'category'} />

            <h2 className={cls.categoryTitle}>{t('category.category')}</h2>
            <br />
            <CategoriesPage categories={categoriesList} />
        </div>
    )
}
