import cls from './Bestsellers.module.css'
import {
    CategoriesContentLayout,
    CategoriesHeader,
} from '@/features/Categories'
import { getProducts } from '@/shared/lib/actions/products'

export const Bestsellers = async () => {
    const bestsellers = await getProducts('products', { limit: 8, page: 1 })

    return (
        <section className={cls.bestsellers}>
            <CategoriesHeader name={'bestsellers'} />
            <CategoriesContentLayout products={bestsellers.data} isHit />
        </section>
    )
}
