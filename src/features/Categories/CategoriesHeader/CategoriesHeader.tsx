import cls from './CategoriesHeader.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const CategoriesHeader = ({ name }: { name: string }) => {
    const { t } = getTranslation()
    return (
        <div className={cls.categoriesHeader}>
            <div className={cls.flexCenter} />
            <h2 className={cls.flexCenter}>{t(`category.${name}`)}</h2>
            <Link className={cls.categoriesHeaderAll} href={`/${name}`}>
                <h3>{t('category.all')}</h3>
                <Image
                    src={'./img/all-arrow.svg'}
                    alt={'переход'}
                    width={15}
                    height={15}
                />
            </Link>
        </div>
    )
}
