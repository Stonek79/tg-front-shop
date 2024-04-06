import cls from './New.module.css'
import { CategoriesHeader, NewCategoriesSection } from '@/features/Categories'
import { getProducts } from '@/shared/lib/actions/products'
import { productsUrl } from '@/shared/consts/products'

export const New = async () => {
    const newProducts = await getProducts(productsUrl, { limit: 8 })

    return (
        <section className={cls.new}>
            <CategoriesHeader name={'new'} />
            <hr />
            <NewCategoriesSection newProducts={newProducts} />
        </section>
    )
}
