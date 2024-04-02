import cls from './Category.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const Category = () => {
    const { t } = getTranslation()

    return (
        <section className={cls.category}>
            <div className={cls.categoryHeader}>
                <h2>{t('category.category')}</h2>
                <Link className={cls.categoryAll} href={'/products/category'}>
                    {t('category.all')}
                    <Image
                        src={'./img/all-arrow.svg'}
                        alt={'переход'}
                        width={15}
                        height={15}
                    />
                </Link>
            </div>
            <hr />
            <h3>Здесь будет слайдер с категориями</h3>
        </section>
    )
}
