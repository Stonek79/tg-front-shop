import cls from './New.module.css'
import {
    CategoriesContentLayout,
    CategoriesHeader,
} from '@/features/Categories'
import { getProducts } from '@/shared/lib/actions/products'

export const New = async () => {
    const newProducts = await getProducts('products', { limit: 8, page: 2 })

    return (
        <section className={cls.new}>
            <CategoriesHeader name={'new'} />
            <CategoriesContentLayout products={newProducts.data} isNew />
        </section>
    )
}
