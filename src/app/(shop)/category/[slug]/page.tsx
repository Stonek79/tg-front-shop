import cls from '@/app/(shop)/category/Category.module.css'
import { CategoriesPage } from '@/features/Categories'
import { allCategories } from '@/shared/consts/categories'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

export default async function Category({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const { t } = getTranslation()

    if (slug === 'all') {
        return (
            <div>
                <Breadcrumbs />
                <h2 className={cls.categoryTitle}>{t('category.all')}</h2>
                <br />
                <CategoriesPage categories={allCategories} />
            </div>
        )
    }
    return (
        <div>
            <Breadcrumbs />
            <br />
            Здесь будут все товары категории {slug}
        </div>
    )
}
