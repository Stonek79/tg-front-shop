import './Bestsellers.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const Bestsellers = () => {
    const { dict } = getTranslation()

    // @ts-ignore
    const bestsellers = dict.category.bestsellers as string
    // @ts-ignore
    const all = dict.buttons.all as string

    return (
        <section className="bestsellers">
            <div className="bestsellers-header">
                <h2>{bestsellers}</h2>
                <Link
                    className="bestsellers-all"
                    href={'/products/bestsellers'}
                >
                    {all}
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
