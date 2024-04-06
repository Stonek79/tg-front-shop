import cls from './Category.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { categoriesList } from '@/shared/lib/consts/categories'
import { CategoriesSlider } from '@/features/Categories'

export const Category = async () => {
    const { t } = getTranslation()
    return (
        <section className={cls.category}>
            <div className={cls.categoryHeader}>
                <h2>{t('category.category')}</h2>
                <Link className={cls.categoryAll} href={'/products/category'}>
                    <h3>{t('category.all')}</h3>
                    <Image
                        src={'./img/all-arrow.svg'}
                        alt={'переход'}
                        width={15}
                        height={15}
                    />
                </Link>
            </div>
            <hr />
            <CategoriesSlider categories={categoriesList} />
        </section>
    )
}
