import cls from './MainPage.module.css'
import { Banner } from '../widgets/Banner'
import { Category } from '@/widgets/Category'
import { Bestsellers } from '@/widgets/Bestsellers'
import { New } from '@/widgets/New'

export default function Home() {
    return (
        <div className={cls.mainPageDescription}>
            <Banner />
            <Category />
            <New />
            <Bestsellers />
        </div>
    )
}
