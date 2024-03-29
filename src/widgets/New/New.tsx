import './New.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const New = () => {
    const { t } = getTranslation()
    //TODO сделать общий компонент заголовка и контейнера

    // // @ts-ignore
    // const all = dict.buttons.all as string
    // // @ts-ignore
    // const newCategory = dict.category.new as string

    return (
        <section className="new">
            <div className="new-header">
                <h2>{t('category.new')}</h2>
                <Link className="new-all" href={'/products/new'}>
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
            <h3>Здесь будет контейнер с новинкаи</h3>
        </section>
    )
}
