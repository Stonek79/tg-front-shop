import cls from './Bestsellers.module.css'
import {
    CategoriesContentLayout,
    CategoriesHeader,
} from '@/features/Categories'
import { productsUrl } from '@/shared/consts/products'
import { getProducts } from '@/shared/lib/actions/products'

export const Bestsellers = async () => {
    const bestsellers = await getProducts(productsUrl, { limit: 8, page: 3 })

    return (
        <section className={cls.bestsellers}>
            <CategoriesHeader name={'bestsellers'} />
            <CategoriesContentLayout products={bestsellers} isHit />
        </section>
    )
}
