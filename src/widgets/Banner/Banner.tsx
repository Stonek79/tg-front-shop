import cls from './Banner.module.css'
import { Button } from '@/shared/ui/Button'
import Link from 'next/link'

export const Banner = () => (
    <section className={cls.banner}>
        <h1>Banner</h1>
        <p>Тут будет рекламный баннер</p>
        <Button variant="clear">
            <Link href={'/products'}>А пока за товарами</Link>
        </Button>
    </section>
)
