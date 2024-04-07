import cls from './CategoriesSection.module.css'
import { CategoriesHeader, CategoriesSlider } from '@/features/Categories'

export const CategoriesSection = async () => (
    <section className={cls.category}>
        <CategoriesHeader name={'category'} />
        <CategoriesSlider />
    </section>
)
