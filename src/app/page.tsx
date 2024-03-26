import './MainPage.css'
import { Bunner } from '@/widgets/Bunner'
import { Category } from '@/widgets/Category'
import { Bestsellers } from '@/widgets/Bestsellers'
import { New } from '@/widgets/New'

export default function Home() {
    return (
        <div className="main-page-description">
            <Bunner />
            <Category />
            <New />
            <Bestsellers />
        </div>
    )
}
