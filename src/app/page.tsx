import cls from './MainPage.module.css'
import { Banner } from '@/widgets/Banner'
import { CategoriesSection } from '@/widgets/CategoriesSection'
import { Bestsellers } from '@/widgets/Bestsellers'
import { New } from '@/widgets/New'

export default function Home() {
    return (
        <div className={cls.mainPageDescription}>
            <Banner />
            <CategoriesSection />
            <New />
            <Bestsellers />
        </div>
    )
}
