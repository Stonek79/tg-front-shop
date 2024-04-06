import cls from './New.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const New = () => {
    const { t } = getTranslation()
    //TODO сделать общий компонент заголовка и контейнера

    return (
        <section className={cls.new}>
            <div className={cls.newHeader}>
                <h2>{t('category.new')}</h2>
                <Link className={cls.newAll} href={'/products/new'}>
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
            <h3>Здесь будет контейнер с новинкаи</h3>
        </section>
    )
}
