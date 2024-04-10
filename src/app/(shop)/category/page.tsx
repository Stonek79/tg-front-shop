import { CategoriesPage } from '@/features/Categories'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import cls from './Category.module.css'

export default async function Categories() {
    const { t } = getTranslation()
    return (
        <div>
            <h2 className={cls.categoryTitle}>{t('category.category')}</h2>
            <br />
            <CategoriesPage />
        </div>
    )
}
