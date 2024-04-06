import cls from './Bestsellers.module.css'
import { CategoriesHeader } from '@/features/Categories'

export const Bestsellers = async () => (
    <section className={cls.bestsellers}>
        <CategoriesHeader name={'bestsellers'} />
        <hr />
        <h3>Здесь будет контейнер с бecтселлерами</h3>
    </section>
)
