import './Category.css'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const Category = () => {
    const { dict } = getTranslation()
    // @ts-ignore
    const all = dict.buttons.all as string
    // @ts-ignore
    const category = dict.category.category as string

    return (
        <section className="category">
            <div className="category-header">
                <h2>{category}</h2>
                <Link className="category-all" href={'/products/category'}>
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
            <h3>Здесь будет слайдер с категориями</h3>
        </section>
    )
}
