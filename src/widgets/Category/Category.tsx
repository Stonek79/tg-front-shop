import cls from './Category.module.css'
import { CategoriesHeader, CategoriesSlider } from '@/features/Categories'

export const Category = async () => (
    <section className={cls.category}>
        <CategoriesHeader name={'category'} />
        <hr />
        <CategoriesSlider />
    </section>
)
