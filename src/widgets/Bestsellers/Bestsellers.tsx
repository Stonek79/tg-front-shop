import cls from './Bestsellers.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const Bestsellers = () => {
    const { t } = getTranslation()

    return (
        <section className={cls.bestsellers}>
            <div className={cls.bestsellersHeader}>
                <h2>{t('category.bestsellers')}</h2>
                <Link
                    className={cls.bestsellersAll}
                    href={'/products/bestsellers'}
                >
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
            <h3>Здесь будет контейнер с бecтселлерами</h3>
        </section>
    )
}
